import { Injectable } from '@angular/core';
import { LicenseConfig } from 'src/app/models/licenseConfigs/licenseConfig';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseConfigsService extends OrianaHttpClientService<SingleResponseModel<LicenseConfig>>{

}
