import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeTokenModel } from 'src/app/models/employeeAuth/employeeTokenModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService extends OrianaHttpClientService<SingleResponseModel<EmployeeTokenModel>> {

  register(routingKey:string,employee:any):Observable<SingleResponseModel<EmployeeTokenModel>>{
    console.log(routingKey);
    return super.postRequest(routingKey,employee);
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
}
