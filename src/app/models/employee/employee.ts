import { OperationClaim } from "../operationClaim/operationClaim";

export interface Employee{
    id:string;
    name:string;
    surname:string;
    department:string;
    email:string;
    password:string;
    operationClaims:OperationClaim[]
}