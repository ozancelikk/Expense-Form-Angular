import { Employee } from "../employee/employee";

export interface ReceiptGetDto{
    id:string;
    employee:Employee;
    documentDate:string;
    total:number;
    documentDescription: string;
    companyName:string;
    AuthorizedName:string;
    adress:string; 
}