export class EmailModel{
    to:string;
    employeeId: string;
    subject:string;
    html: string;
    from:string;
}

export class EmployeeDto {
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

    constructor(
       employeeID: string,
      name: string,
    emailAddress: string,
    designation: string,
    department: string,
    mobileNo?: number,
    unitNameNo?: string,
    laptopAssetCode?: string,
    operatingSystem?: string,
    antivirusName?: string,
    internetConnectionType?: string,
    accessType?: string,
    approvalByHOD?: string,
    reportingHeadEmail?: string,
    status?: string
    ){
      this.employeeID = employeeID
      this.name = name 
      this.emailAddress = emailAddress
      this.designation = designation
      this.department = department
      this.mobileNo = mobileNo
      this.unitNameNo = unitNameNo
      this.laptopAssetCode = laptopAssetCode
      this.operatingSystem  = operatingSystem
      this.antivirusName = antivirusName
      this.internetConnectionType = internetConnectionType
      this.accessType = accessType
      this.approvalByHOD = approvalByHOD
      this.reportingHeadEmail = reportingHeadEmail
      this.status = status
    }
 
 }
 