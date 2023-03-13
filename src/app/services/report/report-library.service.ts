import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';

import { ReportStore } from 'src/app/models/reportStore/reportStore';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReportLibraryService extends OrianaHttpClientService<ListResponseModel<ReportStore>> {

  add(reportLibrary:ReportStore):Observable<SingleResponseModel<ReportStore>>{
    return this.httpClient.post<SingleResponseModel<ReportStore>>(this.apiUrl+"ReportStore/Add",reportLibrary)
  }
  update(reportLibrary:ReportStore):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"ReportStore/Update",reportLibrary)
  }
  delete(id:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"ReportStore/Delete?id="+id)
  }
  getAll():Observable<ListResponseModel<ReportStore>>{
    return this.httpClient.get<ListResponseModel<ReportStore>>(this.apiUrl+"ReportStore/GetAll")
  }
  getById(id:string):Observable<SingleResponseModel<ReportStore>>{
    return this.httpClient.get<SingleResponseModel<ReportStore>>(this.apiUrl+"ReportStore/GetById?id="+id)
  }
  getAllByDeviceId(deviceId:string):Observable<ListResponseModel<ReportStore>>{
    return this.httpClient.get<ListResponseModel<ReportStore>>(this.apiUrl+"ReportStore/GetAllByReportStore?deviceId="+deviceId)
  }
}
