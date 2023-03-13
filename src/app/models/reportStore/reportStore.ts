import { ReportField } from "../reportField/reportField"


export interface ReportStore{
    reportFields:ReportField[]
    reportTitle:string
    deviceId:string
    toCurrentDate:string
    fromCurrentDate:string
    dateOperator:string
    id:string
}