import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/payment/payment';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends OrianaHttpClientService<ListResponseModel<Payment>> {
  getById(apiRoute:string){  
    return this.httpClient.get<SingleResponseModel<Payment>>(this.apiUrl + apiRoute);
   }
   getAll(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiUrl + apiRoute);
   }
   add(payment:string){
    return this.httpClient.post<ListResponseModel<Payment>>(this.apiUrl+"Payment/Add",payment)
   }
   getAllByEmployeeId(employeeId:string):Observable <ListResponseModel<Payment>>{
    let newPath=this.apiUrl+"Voucher/GetByEmployeeId?id="+employeeId;
    return this.httpClient.get<ListResponseModel<Payment>>(newPath)
   }
}
