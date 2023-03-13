import { Component, OnInit } from '@angular/core';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';

@Component({
  selector: 'app-expence-detail',
  templateUrl: './expence-detail.component.html',
  styleUrls: ['./expence-detail.component.css']
})
export class ExpenceDetailComponent implements OnInit {

  voucers:Vouncher[]=[]
  dataloaded:true;
  constructor( private voucherService:VouncherService) { }

  ngOnInit(): void {
    // this.getAll();
  }

  // getAll(){
  //   this.voucherService.getAllVoucher().subscribe((response)=>{
  //     this.voucers=response.data;
  //     this.dataloaded=true;
  //   })
 // }
}
