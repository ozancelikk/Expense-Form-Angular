import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Report } from 'src/app/models/report/report';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends OrianaHttpClientService<ListResponseModel<Report>> {
  getById(apiRoute:string){  
    return this.httpClient.get<SingleResponseModel<Report>>(this.apiUrl + apiRoute);
   }
   reportStarted(id:String):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"Report/ReportStarted?id="+id)
   }
}
