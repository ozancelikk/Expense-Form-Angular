import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from 'src/app/components/settings/user/change-password/change-password.component';
import { Employee } from 'src/app/models/employee/employee';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { AddImage } from 'src/app/models/vouncher/addImage';
import { VoucherGetDto } from 'src/app/models/vouncher/voucherGetDto';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class VouncherService  extends OrianaHttpClientService<ListResponseModel<Vouncher>> {

  getById(id:string){
    let newPath=this.apiUrl+"Voucher/GetById?id="+id;  
    return this.httpClient.get<SingleResponseModel<Vouncher>>(newPath);
   }
   getByVouncherId(id:string){
    let newPath=this.apiUrl+"Voucher/GetByVouncherId?id="+id;  
    return this.httpClient.get<SingleResponseModel<Vouncher>>(newPath);
   }
   getAll(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<Vouncher>>(this.apiUrl + apiRoute);
   }
   add(voucher:Vouncher):Observable<SingleResponseModel<string>>{
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"Voucher/Add",voucher)
   }
   getAllVoucher(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<VoucherGetDto>>(this.apiUrl + apiRoute);
   }
   getAllByEmployeeId(employeeId:string):Observable <ListResponseModel<Vouncher>>{
    let newPath=this.apiUrl+"Voucher/GetByEmployeeId?id="+employeeId;
    return this.httpClient.get<ListResponseModel<Vouncher>>(newPath)
   }
   getImagesByVouncherId(vouncherId:string):Observable <ListResponseModel<VoucherImage>>{
      return this.httpClient.get<ListResponseModel<VoucherImage>>(this.apiUrl+"VouncherImage/GetByImagesByVouncherId?id="+vouncherId);
   }
   imageAdd(addImage:AddImage):Observable<ResponseModel> {
    const formData = new FormData();
    formData.append("image",addImage.image)
    formData.append("voucherId",addImage.voucherId)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"VouncherImage/AddImage",formData);
  }
   getDetailsByEmployeeId(id:string){
    return this.httpClient.get<ListResponseModel<VoucherGetDto>>(this.apiUrl+"Voucher/GetDetailsByEmployeeId?id="+id)
   }
}