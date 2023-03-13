import { Injectable } from '@angular/core';
import { ForgotPassword } from 'src/app/models/forgotPassword/forgotPassword';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OrianaHttpClientService } from '../oriana-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService extends OrianaHttpClientService<SingleResponseModel<ForgotPassword>> {


}
