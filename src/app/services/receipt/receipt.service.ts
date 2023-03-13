import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Receipt } from 'src/app/models/receipt/receipt';
import { ReceiptGetDto } from 'src/app/models/receipt/receiptGetDto';
import { ReceiptImage } from 'src/app/models/receipt/receiptImage';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService extends OrianaHttpClientService<ListResponseModel<Receipt>> {

  getById(apiRoute:string){
    return this.httpClient.get<SingleResponseModel<Receipt>>(this.apiUrl+apiRoute);
  }
  getAll(apiRoute:String){
    return this.httpClient.get<ListResponseModel<Receipt>>(this.apiUrl+apiRoute);
  }
  add(receipt: Receipt){
    return this.httpClient.post<ListResponseModel<Receipt>>(this.apiUrl+"Receipt/Add",receipt);
  }
  getAllReceipt(apiRoute:string){
    return this.httpClient.get<ListResponseModel<ReceiptGetDto>>(this.apiUrl+apiRoute);
  }
  getAllByEmployeeId(employeeId:string):Observable <ListResponseModel<Receipt>>{
    let newPath=this.apiUrl+"Receipt/GetAllByEmployeeId?id="+employeeId;
    return this.httpClient.get<ListResponseModel<Receipt>>(newPath)
   }

   getImagesByReceiptId(receiptId:string):Observable <ListResponseModel<ReceiptImage>>{
    return this.httpClient.get<ListResponseModel<ReceiptImage>>(this.apiUrl+"UploadReceiptImage/GetImagesByReceiptId?id="+receiptId);
   }
   Imageadd(receiptImage:ReceiptImage){
    return this.httpClient.post<ListResponseModel<ReceiptImage>>(this.apiUrl+"UploadReceiptImage/AddImage",receiptImage)
   }
}
