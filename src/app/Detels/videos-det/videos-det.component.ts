import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RestService } from 'src/app/Servic/rest.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-videos-det',
  templateUrl: './videos-det.component.html',
  styleUrls: ['./videos-det.component.css']
})

export class VideosDetComponent implements OnInit {
  langId = '1'
  id
  title;
  details
  ProductType
  image
  arrayOFevents = []
  response
  contanioOrPay
  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService 
  ) { }


  ngOnInit() {  

    this.spinner.show();

    this.router.params.subscribe(params => {
      this.id = params['id']; 
      this.rest.getPrdouctDet(this.langId,this.id).subscribe((res : any) =>{
        this.response = res
        this.response.Counter = 0
        console.log(res)
        this.image = res.ProductImages[0]
        this.title = res.Title
        this.details = res.Details
        this.ProductType = res.ProductType
        let arr = []
        for (let i = 0; i < res.ProductImages.length; i++) {
          let obj = {
            small:res.ProductImages[i],
            medium: res.ProductImages[i],
            big: res.ProductImages[i]
          }
          arr.push(obj)
        }
        this.spinner.hide();
      })
   });
  }
  goToPay(){
    let userName = localStorage.getItem('userNameOFShop')

    if(userName == null){
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    }else{ 
    this.saveEvent()
    this.route.navigateByUrl(`/cheackOut`);
  }
  }

  saveEvent() {
    let userName = localStorage.getItem('userNameOFShop')
    if(userName == null){
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    }else{      

      let resultOFarr:any = JSON.parse(localStorage.getItem("arrOFTEvents"))
      if ( resultOFarr == null || resultOFarr.length == 0) {
        console.log("empty")
        this.response.Counter = 1
        this.arrayOFevents.push(this.response)
      } else {
        console.log("empty 1")
        this.arrayOFevents = JSON.parse(localStorage.getItem("arrOFTEvents"));
        for(let i = 0 ; i < this.arrayOFevents.length ; i++){
          if(this.response.Id == this.arrayOFevents[i].Id){
            this.response.Counter = 0
            this.arrayOFevents[i].price = this.arrayOFevents[i].price / this.arrayOFevents[i].Counter
            this.arrayOFevents[i].Counter += 1
            this.arrayOFevents[i].price = this.arrayOFevents[i].price * this.arrayOFevents[i].Counter
            break
          }
          this.response.Counter = 1
        }
        if(this.response.Counter == 1){
          this.response.price = this.response.price * this.response.Counter
          this.arrayOFevents.push(this.response)
        }
      }
      localStorage.setItem("arrOFTEvents", JSON.stringify(this.arrayOFevents));
      console.log(this.arrayOFevents)
    }
      
  }


}
