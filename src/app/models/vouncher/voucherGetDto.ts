import { Employee } from "../employee/employee"

export interface VoucherGetDto{
    id:string
    documentDate:string
    vouncherNo:string
    company:string
    vouncherType:string
    taxRate:number
    total:number
    taxTotal:number
    expenceId:string;
    employee:Employee;
    vouncherImage:string
}