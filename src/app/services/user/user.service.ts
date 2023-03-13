import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user/user';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends OrianaHttpClientService<ListResponseModel<User>> {

  getById(apiRoute:string){  
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + apiRoute);
   }
   getClaim(apiRoute:string){  
    return this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl + apiRoute);
   }

}
