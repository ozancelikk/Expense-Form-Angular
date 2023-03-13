import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lanugage } from 'src/app/models/language/language';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends OrianaHttpClientService<SingleResponseModel<Lanugage>> {

 setLanguage(routingKey:string):Observable<SingleResponseModel<Lanugage>>{
  return this.httpClient.get<SingleResponseModel<Lanugage>>(this.apiUrl+routingKey);
 }

}
