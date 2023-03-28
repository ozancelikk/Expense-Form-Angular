import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { AddReceiptImage } from 'src/app/models/receipt/addReceiptImage';
import { Receipt } from 'src/app/models/receipt/receipt';
import { ReceiptDetails } from 'src/app/models/receipt/Receiptdetail';
import { ReceiptGetDto } from 'src/app/models/receipt/receiptGetDto';
import { ReceiptImage } from 'src/app/models/receipt/receiptImage';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService extends OrianaHttpClientService<ListResponseModel<Receipt>> {

  getById(apiRoute:string){
    return this.httpClient.get<SingleResponseModel<ReceiptDetails>>(this.apiUrl+apiRoute);
  }
  add(receipt: Receipt):Observable<SingleResponseModel<string>>{
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"Receipt/Add",receipt);
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
   imageAdd(addImage:AddReceiptImage):Observable<ResponseModel> {
    const formData = new FormData();
    formData.append("image",addImage.image)
    formData.append("receiptId",addImage.receiptId)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"UploadReceiptImage/AddImage",formData);
  }
   getReceiptDetailsById(id:string){
    return this.httpClient.get<SingleResponseModel<ReceiptDetails>>(this.apiUrl+"Receipt/GetReceiptDetails?id="+id)
   }
   getDetailsByEmployeeId(id:string){
    return this.httpClient.get<ListResponseModel<ReceiptGetDto>>(this.apiUrl+"Receipt/GetDetailsByEmployeeId?id="+id)
   }
}
