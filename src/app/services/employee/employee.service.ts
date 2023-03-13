import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee/employee';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends OrianaHttpClientService<ListResponseModel<Employee>>{
  
  getById(apiRoute:string){  
    return this.httpClient.get<SingleResponseModel<Employee>>(this.apiUrl + apiRoute);
   }
   getAll(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<Employee>>(this.apiUrl + apiRoute);
   }
   getClaim(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl + apiRoute);
   }
   getByEmployeeId(employeeId:string):Observable <ListResponseModel<Employee>>{
    let newPath=this.apiUrl+"Employee/GetByEmployeeId?id="+employeeId;
    return this.httpClient.get<ListResponseModel<Employee>>(newPath)
   }
  
}
