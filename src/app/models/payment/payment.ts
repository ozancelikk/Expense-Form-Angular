import { Employee } from "../employee/employee";

export interface Payment{
    id:string;
    employeeId:string;
    amount:string;
    paymentChoices:string;
    description:string;
    pay:boolean;
}