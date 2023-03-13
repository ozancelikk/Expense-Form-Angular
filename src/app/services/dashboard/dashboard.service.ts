import { Injectable } from '@angular/core';
import { CPUUsageChartData } from 'src/app/models/dashboard/cpuUsageChartData';
import { DashboardGetAllModel } from 'src/app/models/dashboard/dashboardGetAllModel';
import { MemortStatusChartData } from 'src/app/models/dashboard/memoryStatusChartData';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService  extends OrianaHttpClientService<SingleResponseModel<DashboardGetAllModel>> {
  getCpuUsage(apiRoute: string) {
    return this.httpClient.get<SingleResponseModel<CPUUsageChartData>>(this.apiUrl+apiRoute)
  }

  getMemoryStatus(apiRoute: string) {
    return this.httpClient.get<SingleResponseModel<MemortStatusChartData>>(this.apiUrl+apiRoute)
  }
 
}
