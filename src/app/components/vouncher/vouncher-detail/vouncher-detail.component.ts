import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';

@Component({
  selector: 'app-vouncher-detail',
  templateUrl: './vouncher-detail.component.html',
  styleUrls: ['./vouncher-detail.component.css']
})
export class VouncherDetailComponent implements OnInit {
  vouncher:Vouncher
  vouncherImage:VoucherImage[];
 
  constructor(private vouncherService:VouncherService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param =>{
      this.getById(param["id"])
      this.getImagesByVouncherId(param["id"])
    })
  }
  getById(id:string){
    this.vouncherService.getById(id).subscribe(response=>{
      if (response.success) {
        this.vouncher=response.data
        console.log(this.vouncher)
      }else{
        console.log(response.message)
      }
    })
  }
  getImagesByVouncherId(vouncherId: string){
    this.vouncherService.getImagesByVouncherId(vouncherId).subscribe(response=>{
     
      if (response.success) {
        this.vouncherImage=response.data  
        console.log(this.vouncherImage)
      }else{
        console.log(response.message)
      }
    })
  }


  getImage(voucherImage:VoucherImage){
    let url="https://localhost:44357/Uploads/Vouncher/"+voucherImage.imagePath
    return url;
  }
}
