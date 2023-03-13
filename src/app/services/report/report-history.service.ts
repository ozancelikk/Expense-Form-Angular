import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ReportHistory } from 'src/app/models/report/reportHistory';
import { ReportHistoryDto } from 'src/app/models/report/reportHistoryDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReportHistoryService extends OrianaHttpClientService<ListResponseModel<ReportHistory>> {
  getById(apiRoute:string){  
    return this.httpClient.get<SingleResponseModel<ReportHistory>>(this.apiUrl + apiRoute);
   }

   getAllReportHistoryDto():Observable<ListResponseModel<ReportHistoryDto>>{
    return this.httpClient.get<ListResponseModel<ReportHistoryDto>>(this.apiUrl+"ReportHistory/GetAllReportHistoryDto")
   }
   delete(id:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"ReportHistory/Delete?id="+id)
   }
 
}
