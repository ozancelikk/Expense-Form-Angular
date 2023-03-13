import { OperationClaim } from "../operationClaim/operationClaim"

export interface User{
    id:string
    firstName:string
    lastName:string
    email:string
    status:boolean
    operationClaims:OperationClaim[]
}
