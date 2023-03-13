import { Injectable } from '@angular/core';
import { Expence } from 'src/app/models/expence/expence';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenceService extends OrianaHttpClientService<ListResponseModel<Expence>> {

  getAll(apiRoute:String){
    return this.httpClient.get<ListResponseModel<Expence>>(this.apiUrl+apiRoute);
  }
}
