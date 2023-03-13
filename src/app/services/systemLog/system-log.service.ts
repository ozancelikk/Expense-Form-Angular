import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { SystemLog } from 'src/app/models/systemLogs/systemLog';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SystemLogService  extends OrianaHttpClientService<ListResponseModel<SystemLog>> {

  getAllUnReadMessage(routingKey:string):Observable<ListResponseModel<SystemLog>>{
   return this.httpClient.get<ListResponseModel<SystemLog>>(this.apiUrl+routingKey)
  }
  updateAllUnReadMessage(routingKey:string):Observable<SingleResponseModel<SystemLog>>{
    return this.httpClient.get<SingleResponseModel<SystemLog>>(this.apiUrl+routingKey);
  }
  updateAllUnReadMessageById(routingKey:string,id:string[]):Observable<SingleResponseModel<SystemLog>>{
    return this.httpClient.post<SingleResponseModel<SystemLog>>(this.apiUrl+routingKey,id);
  }
  updateUnReadMessage(routingKey:string,id:string):Observable<SingleResponseModel<SystemLog>>{
    return this.httpClient.get<SingleResponseModel<SystemLog>>(this.apiUrl+routingKey+"?id="+id)
  }
  GetAllUnReadMessageWithPage(page:number,limit:number):Observable<ListResponseModel<SystemLog>>{
    return this.httpClient.get<ListResponseModel<SystemLog>>(this.apiUrl+"SystemInformationsLog/GetAllUnReadMessageWithPage?page="+page+"&limit="+limit)
  }
}
