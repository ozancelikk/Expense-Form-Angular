import { Injectable } from "@angular/core";
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class MicrosoftWebSocket{
    connection:HubConnection

 
    startConnection = () => {
        this.connection = new HubConnectionBuilder().withUrl("https://localhost:44376/toastr",{
          skipNegotiation :true,
          transport : HttpTransportType.WebSockets
        }).build()
    
        this.connection.start().then(()=> {
          console.log("Hub connection Started")
        }).catch(err => console.log("error",err))
      } 
      
      askServer(isStart:boolean){
        this.connection.invoke("askServer",isStart).catch(err => console.log(err))
       
      }
      askServerListener(){
       
        this.connection.on("DisplayMessage",(someText) => {
          console.log(someText + "asdasd")
        })
      }


  
}