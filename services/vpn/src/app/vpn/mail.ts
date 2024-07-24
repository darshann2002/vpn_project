import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { SendOptions } from '../../../../../libs/shared-models/src/lib/dto/mail-dto';
import { CommonResponse } from '@vpn-project/backend-utils';
import { VpnService } from './vpn.service';
import { ProcessEnum, updateRequest } from '@vpn-project/shared-models';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor( 
    private readonly vpnservice :VpnService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'shahimnb.bot@shahi.co.in',
        pass: 'otsx lnvj bdvp ynsf',
      },
      tls: {
        rejectUnauthorized: false // Ignore self-signed certificate
      }
    });
  }


  async send(req: SendOptions): Promise<CommonResponse> {
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

  async sendVPNMail(req: any) {
    try{
      const send = await this.send(req);
      console.log(send,'---res from mail')
      if(send.status) return new CommonResponse(true, 1111, 'Mail sent successfully');
      return new CommonResponse(false,0,'Mail not sent')
    }catch(err){
      console.log(err,'------send mail error in service')
       throw err
    }
  }

  async approveVpn(empId: any) {
    console.log(empId,'-emp id')
    const empDetails = await this.vpnservice.getEmpDataById(empId)
    console.log(empDetails,'---')
    const emailDetails = {
      from: 'shahimnb.bot@shahi.co.in',
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
          <p>User with the following details has been approved for VPN access:</p>
          <table>
            
          </table>
        </body>
        </html>
      `,
    };
    const approveReq = new updateRequest()
    approveReq.employeeId = empId
    approveReq.status = ProcessEnum.APPROVE
    try {
       await this.transporter.send(emailDetails);
      console.log('Approval email sent to IT Dept');
    } catch (error) {
      console.error('Error sending approval email:', error);
      throw error;
    }
  }

  async rejectVpn(empId: any) {
    console.log(empId,'-emp id')
    const empDetails = await this.vpnservice.getEmpDataById(empId)
    console.log(empDetails,'---')
    const emailDetails = {
      from: 'shahimnb.bot@shahi.co.in',
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
          <p>User with the following details has been Rejected for VPN access:</p>
          <table>
          
          </table>
        </body>
        </html>
      `,
    };
    const rejectReq = new updateRequest()
    rejectReq.employeeId = empId
    rejectReq.status = ProcessEnum.REJECT
    try {
       await this.transporter.send(emailDetails);
      console.log('Rejection email sent to IT Dept');
    } catch (error) {
      console.error('Error sending rejection email:', error);
      throw error;
    }
  }
}