import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrianaHttpClientService<ApiResponseType> {

  //apiUrl=window["env"]["apiUrl"] || "default"
  apiUrl="https://localhost:44357/api/" 



  constructor(
    protected httpClient: HttpClient,
   //  @Inject('apiUrl') public apiUrl:string,
  ) { }


  getRequest(apiRoute: string): Observable<ApiResponseType> {
    return this.httpClient.get<ApiResponseType>(this.apiUrl + apiRoute);
  }
  postRequest(apiRoute: string, body: any): Observable<ApiResponseType> {
    return this.httpClient.post<ApiResponseType>(this.apiUrl + apiRoute, body);
  }
}
