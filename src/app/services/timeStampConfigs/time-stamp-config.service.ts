import { Injectable } from '@angular/core';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TimeStampConfig } from 'src/app/models/timeStampConfigs/timeStampConfig';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TimeStampConfigService extends OrianaHttpClientService<SingleResponseModel<TimeStampConfig>>{

}
