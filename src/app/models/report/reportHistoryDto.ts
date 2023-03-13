import { ReportStore } from "../reportStore/reportStore";
import { Report } from "./report";
import { ReportHistory } from "./reportHistory";

export interface ReportHistoryDto{
 //   scheduledReport:Report
    reportStore:ReportStore
    reportHistory:ReportHistory
}