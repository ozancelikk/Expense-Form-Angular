import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenModel } from 'src/app/models/auth/tokenModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends OrianaHttpClientService<SingleResponseModel<TokenModel>> { 

  register(routingKey: string, user:any): Observable<SingleResponseModel<TokenModel>> {
    console.log(routingKey)
    return super.postRequest(routingKey, user,);
  }

  isAuthentitaced(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false
    }
  }
}

