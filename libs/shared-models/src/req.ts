import { ProcessEnum } from "./enum"

export class IdRequest{
    employeeId: string

    constructor(
        employeeId: string
    ){
        this.employeeId = employeeId
    }
}


export class updateRequest{
    employeeId?: string
    status?:ProcessEnum
    access_status?: ProcessEnum
    constructor(
        employeeId?: string,
      status?:ProcessEnum,
      access_status?: ProcessEnum

    ){
        this.employeeId = employeeId
        this.status = status
        this.access_status = access_status
    }
}
    