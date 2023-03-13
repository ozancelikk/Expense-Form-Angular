import { Injectable } from '@angular/core';
import { MailConfig } from 'src/app/models/mailConfigs/mailConfig';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MailConfigsService extends OrianaHttpClientService<SingleResponseModel<MailConfig>> {

}
