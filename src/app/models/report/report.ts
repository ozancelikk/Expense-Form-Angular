import { UsedDevice } from "../usedDevices/usedDevice"

export interface Report {
  schedule: {
    scheduleHour: number,
    scheduleMinute: number,
    schedulerName: string,
    scheduleType: string,
    scheduleMonth: string,
    scheduleDay: string
  },
  isEnabled: boolean,
  reportStoreId:string
  report: {
    reportDescription: string,
    mailStatus: boolean
  },
  usedDeviceID: string,
  function: string,
  id:string
  reportGroup:{
    reportGroupType:string
  }
  usedDevice:UsedDevice
}