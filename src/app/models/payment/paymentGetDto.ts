import { Employee } from "../employee/employee";

export interface PaymentGetDto{
    id:string;
    employee:Employee;
    amount:string;
    paymentChoices:string;
    description:string;
    pay:boolean;
}