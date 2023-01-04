import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Servic/rest.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  eventList = new Array<string>();
  ActiveID = 1
  routerName;
  header = "المتجر الثقافي"
  userName = "تسجيل الدخول"
  subscription: Subscription;
  notLogain = true;
  whenLogin = false

  constructor(private router:Router ,
     private rest:RestService,
     private spinner: NgxSpinnerService 
     ) { 

  }

  ngOnInit() {
    let elment: HTMLElement = document.getElementById('myModala') as HTMLElement
    elment.click()
    this.userName =  "تسجيل الدخول"
    let item = localStorage.getItem('userNameOFShop')

    if (item == null) {
      this.notLogain = true
      this.whenLogin = false
      this.userName
        this.rest.getToken().subscribe(res => {
        this.notLogain = false
        this.whenLogin = true
        localStorage.setItem('userNameOFShop', res.UserName)
        localStorage.setItem('tokenDataOfShop', res.TokenData.access_token)
        console.log(res)
        this.userName = res.UserName
        this.spinner.hide();
      })
    } else {
      this.notLogain = false
      this.whenLogin = true
      this.userName = item
    }

  this.subscription = this.rest.getObsData().subscribe(res => {
    console.log(res)
  this.header = res.Name
  })
  }

  logOut(){
    this.spinner.show()
    localStorage.removeItem("userNameOFShop");
    localStorage.removeItem("tokenDataOfShop")
    this.router.navigateByUrl(`/product`);
    localStorage.removeItem("arrOFTEvents");
    localStorage.removeItem("pendMasgShop");
    localStorage.removeItem("statusPaymentShop");
    this.ngOnInit()
    
    setInterval(() => {
      this.spinner.hide()
    },2000)
  }

  goToCheakOut() {
    let token = localStorage.getItem('tokenDataOfShop')
    if (token == null) {
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    } else {
      this.router.navigateByUrl(`/cheackOut`);
    }
  }
}
