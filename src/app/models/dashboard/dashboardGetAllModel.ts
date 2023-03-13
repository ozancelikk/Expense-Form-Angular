import { DiscoveredDevice } from "../discoveredDevices/discoveredDevice"
import { SystemLog } from "../systemLogs/systemLog"
import { CPUUsageChartData } from "./cpuUsageChartData"
import { Drive } from "./drive"
import { UsedDeviceBrandCount } from "./usedDeviceBrandCount"

export interface DashboardGetAllModel{
    weeklyLogCountsDays:[]
    weeklyLogCountsNumbers:[]
    monthlyLogCountsDays:[]
    monthlyLogCountsNumbers:[]
    monthlyLogCounts:[]
    weeklyLogCounts:[]
    theMostLogSenderCountDates:string[]
    theMostLogSenderIPAddresses:string[]
    theMostLogSenderLogCounts:number[]
    usedDeviceBrands:string[]
    usedDeviceBrandCounts:UsedDeviceBrandCount[]
    discoveredDevices:DiscoveredDevice[]
    systemInformationsLogs:SystemLog[]
    cpuUsageChartData:CPUUsageChartData
    drive:Drive

}