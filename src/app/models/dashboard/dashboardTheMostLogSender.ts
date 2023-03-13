import { UsedDeviceBrandCount } from "./usedDeviceBrandCount"

export interface DashboardTheMostLogSender{
    countDate:string
    logCount:number
    usedDeviceIPAddress:string
    usedDeviceName:string
    usedDeviceBrand:string
    usedDeviceModel:string
  
}