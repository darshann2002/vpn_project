import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Query, Res } from "@nestjs/common";
import { VpnService } from "./vpn.service";
import { CommonResponse } from "@vpn-project/backend-utils";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { EmployeeDto, IdRequest, updateRequest } from '@vpn-project/shared-models'
import { MailerService } from "./mail";

@Controller('vpn')
// @ApiTags('vpn')
export class VPNController{
    constructor(
        private readonly vpnService : VpnService,
        private readonly mailService : MailerService
    ){}

    @Post('/getEmployeeData')
    async getEmployeeData(): Promise<CommonResponse> {
        try {
            return await this.vpnService.getEmployeeData();
        } catch (err) {
            console.log(err, 'Error in getEmployeeData');
            throw err; // Consider handling this properly for production use
        }
    }

    @Post('/createEmployee')
    async createEmployee(@Body() req: IdRequest): Promise<CommonResponse> {
        try {
            return await this.vpnService.createEmployee(req);
        } catch (err) {
            console.log(err, ',,,,');
        }
    }

    @Post('/createVpn')
    @ApiBody({type:EmployeeDto})
    async createVpn(@Body() req: any): Promise<CommonResponse> {
        try {
            console.log(req,'..........')
            return await this.vpnService.createVpn(req);
        } catch (err) {
            console.log(err, ',,,,');
            throw(err)
        }
    }

    @Post('/getVpnAllData')
    async getVpnAllData(@Body() req:any): Promise<CommonResponse> {
        try {
            return await this.vpnService.getVpnAllData(req);
        } catch (err) {
            console.log(err, ',,,,');
            throw(err)
        }
    }

    @Post('/updateStatus/:empId')
    async updateStatus(@Param() params: any): Promise<CommonResponse> {
        try {
            console.log(params,'..........params')
            return await this.vpnService.updateStatus(params);
        } catch (err) {
            console.log(err, ',,,,');
            throw(err)
        }
    }

    @Post('/updateStatus2/:empId')
    async updateStatus2(@Param() params: any): Promise<CommonResponse> {
        try {
            console.log(params,'..........params')
            return await this.vpnService.updateStatus2(params);
        } catch (err) {
            console.log(err, ',,,,');
            throw(err)
        }
    }

    
    

    @Post('/sendVPNMail')
    async sendVPNMail(@Body() req: any): Promise<any> {
      try {
        return await this.mailService.send(req);
      } catch (error) {
      }
    }

    @Post('/statusCount')
    async statusCount(): Promise<any> {
      try {
        return await this.vpnService.statusCount();
      } catch (error) {
        console.log(error)

      }
    }
    // @Post('/accessStatus')
    // async accessStatus(): Promise<any> {
    //   try {
    //     return await this.vpnService.accessStatus();
    //   } catch (error) {
    //     console.log(error)

    //   }
    // }
  

    //for access button (completed or not )


 

    @Post('/approveVpn/:empId')
    async approveVpn(@Param() params: any) {
      console.log(params,'--controller')
      try {
        await this.mailService.approveVpn(params);
        return new CommonResponse(true, 1111, 'User details Approved and mail sent to IT Head');
      } catch (err) {
        console.log(err, 'Error in approveVpn');
        throw err;
      }
    }

    
    @Post('/rejectVpn/:empId')
    async rejectVpn(@Param() params: any) {
      console.log(params,'--controller')
      try {
        await this.mailService.rejectVpn(params);
        return new CommonResponse(true, 1111, 'User details Rejected and mail sent to IT Head');
      } catch (err) {
        console.log(err, 'Error in rejectVpn');
        throw err;
      }
    }

    @Get('/getEmpDataById')
    async getEmpDataById(@Body() empId:any): Promise<any> {
      try {
        return await this.vpnService.getEmpDataById(empId);
      } catch (error) {
        console.log(error)

      }
    }

    // @Post('/updateStatus3/:empId')
    // async updateStatus3(@Param() params: any): Promise<CommonResponse> {
    //     try {
    //         console.log(params,'..........params')
    //         return await this.vpnService.updateStatus3(params);
    //     } catch (err) {
    //         console.log(err, ',,,,');
    //         throw(err)
    //     }
    // }

    @Post('/updateStatus3')
  async updateStatus3(@Body() req: any):Promise<any> {
    // console.log(req , '--controller')
    try{
      return this.vpnService.updateStatus3(req)
    }catch(err){
      console.log(err,'----')
    }
  }

  @Get('getCurrentStatus')
  async getCurrentStatus() {
    return this.vpnService.getCurrentStatus();
  }
  
    @Post('/accessStatus')
    @ApiBody({type:EmployeeDto})
    async accessStatus(@Body() req: any): Promise<CommonResponse> {
        try {
            console.log(req,'..........')
            return await this.vpnService.accessStatus(req);
        } catch (err) {
            console.log(err, ',,,,');
            throw(err)
        }
    }
  }