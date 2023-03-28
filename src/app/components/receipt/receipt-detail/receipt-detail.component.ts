import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receipt } from 'src/app/models/receipt/receipt';
import { ReceiptDetails } from 'src/app/models/receipt/Receiptdetail';
import { ReceiptImage } from 'src/app/models/receipt/receiptImage';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.css']
})
export class ReceiptDetailComponent implements OnInit {
  receiptDetail:ReceiptDetails;
  receiptImage:ReceiptImage[];

  constructor(
    private receiptService:ReceiptService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      this.getById(param["id"]);
      this.getImagesByReceiptId(param["id"])
    })
  }

  getById(id:string){
    this.receiptService.getReceiptDetailsById(id).subscribe(response=>{
      if (response.success) {
        this.receiptDetail=response.data
        console.log(this.receiptDetail)  
      }else{
        console.log(response.message)
      }
      
    })
  }

  getImagesByReceiptId(receiptId:string){
    this.receiptService.getImagesByReceiptId(receiptId).subscribe(response=>{
      if (response.success) {
       this.receiptImage=response.data
       console.log(this.receiptImage) 
      }else{
        console.log(response.message)
      }
    })
  }
  
  getImage(receiptImage:ReceiptImage){
    let url="https://localhost:44357/Uploads/Receipt/"+receiptImage.imagePath
    return url;
  }

}
