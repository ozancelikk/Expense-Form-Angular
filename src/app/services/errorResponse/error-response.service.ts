import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class ErrorResponseService {
    /**
     *
     */
    constructor(private toastrService:ToastrService) {
    

    }
    getErrorMessage(errorResponse:any){
        console.log(errorResponse)
            this.toastrService.error(errorResponse)
    }
}
