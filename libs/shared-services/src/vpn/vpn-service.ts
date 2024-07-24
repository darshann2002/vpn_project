import { CommonAxiosServicePms } from "../common-axios-service-prs";
import { CommonResponse } from "@vpn-project/backend-utils";
import { EmailModel, EmployeeDto, IdRequest, updateRequest } from '@vpn-project/shared-models';
import { VpnIdReq } from "../../../shared-models/src/lib/dto/employee.dto";


export class VpnService extends CommonAxiosServicePms{
   URL = '/vpn'

   async getEmployeeData(): Promise<CommonResponse> {
      return await this.axiosPostCall(this.URL + '/getEmployeeData')
  }
   async createEmployee() : Promise<CommonResponse>{
      return await this.axiosPostCall(this.URL + '/createEmployeeDto')
   }

   async createVpn(req: IdRequest) : Promise <CommonResponse>{
      console.log(req,'0000000000')
      return await this.axiosPostCall(this.URL + '/createVpn',req)
   }

   async getVpnAllData(req:any) : Promise <CommonResponse>{
      return await this.axiosPostCall(this.URL + '/getVpnAllData',req)
   }

   async updateStatus(req: updateRequest) : Promise <CommonResponse>{
      return await this.axiosPostCall(this.URL + '/updateStatus',req)
   }

   async updateStatus2(req: updateRequest) : Promise <CommonResponse>{
    return await this.axiosPostCall(this.URL + '/updateStatus2',req)
 }

 

   async sendVPNMail(req: EmailModel) {
      return await this.axiosPostCall(this.URL + '/sendVPNMail', req)
  }
  async sendITMail(req: EmailModel) {
   return await this.axiosPostCall(this.URL + '/sendITMail', req)
}

  async statusCount(): Promise <CommonResponse> {
   return await this.axiosPostCall(this.URL + '/statusCount')
}
async login(values: any): Promise<any> {
   return new Promise((resolve) => {
     setTimeout(() => {
       if (values.cardNumber === 'user' && values.password === 'password') {
         resolve({
           status: true,
           internalMessage: 'User logged in successfully',
           data: { token: 'mockToken', user: { name: 'Mock User' } },
         });
       } else {
         resolve({
           status: false,
           internalMessage: 'Invalid credentials',
         });
       }
     }, 1000);
   });
 }
 async updatePassword(values: any): Promise<any> {
   return new Promise((resolve) => {
     setTimeout(() => {
       resolve({
         status: true,
         internalMessage: 'Password updated successfully',
       });
     }, 1000);
   });
 }



 //for completed r not 
//  async updateTommyIsActive(req: any, config?: AxiosRequestConfig): Promise<any> {
//   console.log('sghared serv',req)
//   return await this.axiosPostCall(this.getURLwithMainEndPoint('updateTommyIsActive'), req, config)
// }
// async accessStatus(): Promise <CommonResponse> {
//   console.log('aceessssssssssss')
//   return await this.axiosPostCall(this.URL + '/accessStatus')
// }

// async accessStatus(req: VpnId, config?: AxiosRequestConfig): Promise<any> {
//   // console.log('sghared serv',req)
//   return await this.axiosPostCall(this.getURLwithMainEndPoint('updateTommyIsActive'), req, config)
// }

async accessStatus(req: updateRequest) : Promise <CommonResponse>{
  console.log(req,'0000000000')
  return await this.axiosPostCall(this.URL + '/accessStatus',req)
}

async updateStatus3(req: VpnIdReq) : Promise <CommonResponse>{
  return await this.axiosPostCall(this.URL + '/updateStatus3',req)
}

async getCurrentStatus() : Promise <CommonResponse>{
  return await this.axiosPostCall(this.URL + '/getCurrentStatus')
}

}




   



































































































































