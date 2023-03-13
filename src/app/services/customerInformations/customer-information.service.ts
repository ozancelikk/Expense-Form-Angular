import { Injectable } from '@angular/core';
import { CustomerInformation } from 'src/app/models/customerInformations/customerInformation';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService extends OrianaHttpClientService<SingleResponseModel<CustomerInformation>> {

}
