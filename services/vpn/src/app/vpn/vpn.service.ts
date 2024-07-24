import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { DataSource, Repository } from 'typeorm';
import { CommonResponse } from '@vpn-project/backend-utils';
import { VpnEntity } from './vpn.entity';
import { IdRequest, ProcessEnum, updateRequest } from '@vpn-project/shared-models';
import { VpnIdReq } from '../../../../../libs/shared-models/src/lib/dto/employee.dto';

@Injectable()
export class VpnService {

  private transporter: nodemailer.Transporter

  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(VpnEntity)
    private readonly vpnRepo: Repository<VpnEntity>,
    private datasource:DataSource,

  ) {
    this.transporter = nodemailer.createTransport({
      host: 'zmail.shahi.co.in',
      port: 587,
      secure: false,
      auth: {
        user: 'chuneth.shivarudrappa@shahi.co.in',
        pass: 'ChunethHS@!46',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // async getUserDetailsByEmployeeID(employeeID: string) {
  //   const userDetails = userDetailsMock.find(user => user.employeeID === employeeID);

  //   if (!userDetails) {
  //     throw new NotFoundException('User not found');
  //   }

  //   await this.sendCreationAndReportingMail(userDetails);

  //   return userDetails;
  // }

  

  async getEmployeeData():Promise<CommonResponse>{
    try{
      const getData = await this.employeeRepo.find({order :{name: 'ASC'}})

      if(getData.length > 0){
        return new CommonResponse(true, 1,'Data retrieved successfully',getData)
      }else{
        return new CommonResponse(false, 0,'No data found',[])
      }

    }catch(err){
      throw(err)
    }
  }

  async createEmployee(createEmployeeDto: IdRequest): Promise<CommonResponse> {
    try {
      const newEmployee = this.employeeRepo.create(createEmployeeDto);
      await this.employeeRepo.save(newEmployee);
      return new CommonResponse(true, 1, 'Employee created successfully', newEmployee);
    } catch (error) {
      return new CommonResponse(false, 0, 'Error creating employee', error.message);
    }
  }

  async createVpn(req: IdRequest): Promise<CommonResponse> {
    console.log(req,"+++++++++++")
    try {
      const existing = await this.vpnRepo.findOne({where:{employeeId: req.employeeId}})
      if(existing){
        return new CommonResponse(false,0,'Employee already applied for VPN')
      }
      const entity = new VpnEntity()
      entity.employeeId = req.employeeId
      entity.status = ProcessEnum.OPEN
      const save = await this.vpnRepo.save(entity);
      console.log(save,'mmmmmmmmmmm')
      if(save){
        console.log("%%%%%%%%%%%%",save)
      
      return new CommonResponse(true, 1, 'VPN created successfully', entity);
        
      }

      


    } catch (error) {
      return new CommonResponse(false, 0, 'Error', error.message);
    }
}

async getVpnAllData(req:updateRequest):Promise<CommonResponse>{
  console.log(req,"serviceeeee")

  const query = `SELECT e.employee_id as employeeId,e.name,e.email_id as emailId,e.department,e.reporting_head as reportingHead,v.status FROM vpn AS v 
LEFT JOIN vpn_employee AS e ON e.employee_id = v.employee_id WHERE v.status = '${req.status}'`
  const data = await this.datasource.query(query)
  if (data.length > 0){
      return new CommonResponse(true,1,"Data retreived Succesfully",data)
  } else {
    return new CommonResponse(false,0,"No Data found",[])     
  }
 
}

async updateStatus(req:any):Promise<CommonResponse>{
  console.log(req,'llllllllllll')
  const update = await this.vpnRepo.update({employeeId:req.empId},{status:ProcessEnum.APPROVE})
  console.log(update,'==========')
  if(update.affected){
    await this.approveVpn(req)
    return new CommonResponse(true,1,"Status updated successfully")
  }  else {
    return new CommonResponse(false,0,"something went wrong")
  }
}

async updateStatus2(req:any):Promise<CommonResponse>{
  console.log(req,'llllllllllll')
  const update = await this.vpnRepo.update({employeeId:req.empId},{status:ProcessEnum.REJECT})
  console.log(update,'==========')
  if(update.affected){
    await this.rejectVpn(req)
    return new CommonResponse(true,1,"Status updated successfully")
  }  else {
    return new CommonResponse(false,0,"something went wrong")
  }
}




async send(req: any): Promise<CommonResponse> {
  try {
    await this.transporter.sendMail(req);
    return new CommonResponse(true, 1111, "Mail sent successfully");
  } catch (error) {
    console.log(error,'--error in send ')
    // Check specific Nodemailer error types and handle them accordingly
    if (error.code === 'EENVELOPE' || error.code === 'ECONNECTION' || error.code === 'EMESSAGE') {
      return new CommonResponse(false, 500, "Failed to send mail: Invalid email configuration");
    } else if (error.code ===   'EPROTOCOL' || error.code === 'EAUTH') {
      return new CommonResponse(false, 500, "Failed to send mail: Authentication or protocol error");
    } else {
      return new CommonResponse(false, 500, "Failed to send mail: Unknown error");
    }
  }
}

async approveVpn(req: any) {
  const empDetails = await this.getEmpDataById(req.empId)
  console.log(empDetails,'---employe details')
  const emailDetails = {
    from: '"VPN" <no-reply@shahi.co.in>',
    to: 'ashif.abdulkadhar@shahi.co.in',
    subject: 'VPN Access Approved for the Employee',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <p>Dear team,</p>
        <p>User with the following details has been <B>Approved</B> for VPN access:</p>
        <table>
          <tr>
            <th>Employee ID</th>
            <td>${empDetails.data[0]?.employeeId}</td>
          </tr>
          <tr>
            <th>Employee Name</th>
            <td>${empDetails.data[0]?.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${empDetails.data[0]?.emailId}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>${empDetails.data[0]?.department}</td>
          </tr>
           <tr>
            <th>Barcode</th>
            <td>${empDetails.data[0]?.barcode}</td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  const emailToEmployee = {
    from: '"VPN" <no-reply@shahi.co.in>',
    to: empDetails.data[0]?.emailId,
    subject: 'VPN Access Approved',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <p>Dear ${empDetails.data[0]?.name},</p>
         <p>Your request for VPN access has been <b>Approved</b>.</p>
      </body>
      </html>
    `,
  };

  try {
     await this.send(emailDetails);
    console.log('Approval email sent to IT Dept');
    await this.send(emailToEmployee);
    console.log('Approval email sent to Employee');
  } catch (error) {
    console.error('Error sending approval email:', error);
    throw error;
  }
}

async rejectVpn(req: any) {
  const empDetails = await this.getEmpDataById(req.empId)
  console.log(empDetails,'---')
  const emailDetails = {
    from: '"VPN" <no-reply@shahi.co.in>',
    to: 'ashif.abdulkadhar@shahi.co.in',
    subject: 'VPN Access Rejected for the Employee',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <p>Dear team,</p>
        <p>User with the following details has been <B>Rejected</B> for VPN access:</p>
        <table>
          <tr>
            <th>Employee ID</th>
            <td>${empDetails.data[0]?.employeeId}</td>
          </tr>
          <tr>
            <th>Employee Name</th>
            <td>${empDetails.data[0]?.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${empDetails.data[0]?.emailId}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>${empDetails.data[0]?.department}</td>
          </tr>
           <tr>
            <th>Barcode</th>
            <td>${empDetails.data[0]?.barcode}</td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  const emailToEmployee = {
    from: '"VPN" <no-reply@shahi.co.in>',
    to: empDetails.data[0]?.emailId,
    subject: 'VPN Access Rejected',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <p>Dear ${empDetails.data[0]?.name},</p>
         <p>Your request for VPN access has been <b>Rejected</b>.</p>
      </body>
      </html>
    `,
  };

  try {
     await this.send(emailDetails);
    console.log('Rejection email sent to IT Dept');
    await this.send(emailToEmployee);
    console.log('Approval email sent to Employee');
  } catch (error) {
    console.error('Error sending rejection email:', error);
    throw error;
  }
}



// async accessStatus():Promise<CommonResponse>{
//   try{
//       let query = `SELECT
//       COALESCE(SUM(CASE WHEN status = 'ACCESS GIVEN' THEN 1 ELSE 0 END),) AS accessedCount,
//       COALESCE(SUM(CASE WHEN status = 'ACCESS NOT GIVEN' THEN 1 ELSE 0 END),) AS notaccessedCount
//       FROM vpn`
//       const result = await this.datasource.query(query)
//       if (result.length) {
//           return new CommonResponse(true, 1, 'Data retrieved successfully', result);
//         } else {
//           return new CommonResponse(false, 0, 'No data found', []);
//         }
//   }catch(err){
//       throw(err)
//   }
// }


//for completed or not 



async getData():Promise<CommonResponse>{
  try{
    const data = await this.vpnRepo.find({order:{status: 'ASC'}})

    if(data.length > 0){
      return new CommonResponse(true,1,'Dtat retreved',data)
    }else{
      return new CommonResponse(false,2,'Dtat retreved',data)
    }
  }catch(err){
    throw(err)
  }
}

async getEmpDataById(empId):Promise<CommonResponse>{
  try{
    const data = await this.employeeRepo.find({where:{employeeId:empId}})
    if(data.length > 0){
      return new CommonResponse(true,1,'Dtat retreved',data)
    }else{
      return new CommonResponse(false,2,'Dtat retreved',data)
    }
  }catch(err){
    throw(err)
  }
}


// async accessStatus(req: any): Promise<CommonResponse> {
//   const update = await this.employeeRepo.update({ id: req.id }, { accessStatus : false})
//   if(update.affected) return new CommonResponse(true, 1, 'Updated')
//     return new CommonResponse(false, 0, 'Something went wrong while updating')
// }
async statusCount():Promise<CommonResponse>{
  try{
      let query = `SELECT
        COALESCE(SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END), 0) AS openCount,
        COALESCE(SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END), 0) AS approvedCount,
        COALESCE(SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END), 0) AS rejectedCount
      

      FROM vpn`
      const result = await this.datasource.query(query)
      if (result.length) {
          return new CommonResponse(true, 1, 'Data retrieved successfully', result);
        } else {
          return new CommonResponse(false, 0, 'No data found', []);  //
        }
  }catch(err){
      throw(err)
  }
}

async accessStatus(req: updateRequest): Promise<CommonResponse> {
  console.log(req,"+++++++++++")
  try {
    const existing = await this.vpnRepo.findOne({where:{employeeId: req.employeeId}})
    if(existing){
      return new CommonResponse(false,0,'Employee already got Access for VPN')
    }
    const entity = new VpnEntity()
    entity.employeeId = req.employeeId
    entity.status = ProcessEnum.COMPLETED
    const save = await this.vpnRepo.save(entity);
    console.log(save,'mmmmmmmmmmm')
    if(save){
      console.log("%%%%%%%%%%%%",save)
    
    return new CommonResponse(true, 1, 'VPN Access given successfully', entity);
      
    }
  } catch (error) {
    return new CommonResponse(false, 0, 'Error', error.message);
  }
}

// async updateStatus3(req:any):Promise<CommonResponse>{
//   console.log(req,'llllllllllll')
//   const update = await this.vpnRepo.update({employeeId:req.empId},{status:ProcessEnum.COMPLETED})
//   console.log(update,'==========')
//   if(update.affected){
//     return new CommonResponse(true,1,"Status updated successfully")
//   }  else {
//     return new CommonResponse(false,0,"something went wrong")
//   }
// }

async updateStatus3(req: VpnIdReq): Promise<CommonResponse> {
  console.log(req)
  const update = await this.vpnRepo.update({ employeeId: String(req.id) }, { accessStatus : req.status})
  if(update.affected) return new CommonResponse(true, 1, 'Updated')
    return new CommonResponse(false, 0, 'Something went wrong while updating')
}

async getCurrentStatus() {
  return this.vpnRepo.find(); 
}

}