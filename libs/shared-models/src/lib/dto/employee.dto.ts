export class CreateEmployeeDto {
   employeeID: string;
   name: string;
   emailAddress: string;
   designation: string;
   department: string;
   mobileNo?: number;
   unitNameNo?: string;
   laptopAssetCode?: string;
   operatingSystem?: string;
   antivirusName?: string;
   internetConnectionType?: string;
   accessType?: string;
   approvalByHOD?: string;
   reportingHeadEmail?: string;
   status?: string;
}

export class UpdateEmployeeDto {
   employeeID: string
   name: string
   emailAddress: string;
   designation: string;
   department: string;
   mobileNo?: number;
   unitNameNo?: string;
   laptopAssetCode?: string;
   operatingSystem?: string;
   antivirusName?: string;
   internetConnectionType?: string;
   accessType?: string;
   approvalByHOD?: string;
   reportingHeadEmail?: string;
   status?: string;
 }
 export class VpnIdReq {
   id : number;
   status: string;
 }