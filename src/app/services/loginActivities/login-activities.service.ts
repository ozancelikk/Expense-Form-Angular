import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { LoginActivity } from 'src/app/models/loginActivities/loginActivity';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivitiesService  extends OrianaHttpClientService<ListResponseModel<LoginActivity>> {


}
