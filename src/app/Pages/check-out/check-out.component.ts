import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Servic/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  subscription: Subscription;

  arrOFtikets = []
  formBook: FormGroup;
  fessIframe: any
  payButton = true
  arrayOfTicketsEmt = false
  penddingMag;
  fullName;
  emailAdress
  phoneNumber: number
  total = 0
  showInputsForCash
  productOrderQties = []
  constructor(private rest: RestService,
    private router: Router,

  ) { }

  ngOnInit() {

    let accToken = localStorage.getItem('tokenDataOfShop')

    this.rest.getUserInfo(accToken).subscribe((res: any) => {
      console.log("this is user info ", res)
      this.fullName = res.MainData.NameEn
      this.emailAdress = res.MainData.Email
    })

    this.formBook = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone_number: new FormControl('', Validators.required),
      country: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      building: new FormControl("", Validators.required),
      apartment: new FormControl("", Validators.required),
      floor: new FormControl("", Validators.required),
      paymentUse: new FormControl('', Validators.required)
    })

    this.arrOFtikets = JSON.parse(localStorage.getItem("arrOFTEvents"));

    if (this.arrOFtikets != null) {
      this.arrayOfTicketsEmt = false
      for (let i = 0; i < this.arrOFtikets.length; i++) {
        this.total = this.total + this.arrOFtikets[i].price
      }
      console.log("this is ", this.arrOFtikets)

      if (this.arrOFtikets.length == 0) {
        this.arrayOfTicketsEmt = true
      } else {
        this.arrayOfTicketsEmt = false
      }
    } else {
      this.arrayOfTicketsEmt = true
    }

  }

  deletItem(id, i) {
    if (id == this.arrOFtikets[i].Id) {
      this.arrOFtikets.splice(i, 1)
    }
    if (this.arrOFtikets.length != 0) {
      this.total = 0
      for (let i = 0; i < this.arrOFtikets.length; i++) {
        this.total = this.total + this.arrOFtikets[i].price
      }
      localStorage.setItem("arrOFTEvents", JSON.stringify(this.arrOFtikets));
    } else {
      this.payButton = false
      this.arrayOfTicketsEmt = true
      localStorage.setItem("arrOFTEvents", JSON.stringify(this.arrOFtikets));
    }

  }

  sendFess() {
    this.arrOFtikets = JSON.parse(localStorage.getItem("arrOFTEvents"));
    let total = 0
    for (let i = 0; i < this.arrOFtikets.length; i++) {
 
      total = total + this.arrOFtikets[i].price
    }

    let obj = this.formBook.value
    console.log(obj)

    let fessObj
    if (obj.paymentUse == "Card") {
 
      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 59,
        community_id: "M2Q1r2Y",
        pay_using: "card"
      }
    } else if (obj.paymentUse == "kiosk") {

      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 59,
        community_id: "M2Q1r2Y",
        pay_using: "kiosk"
      }

    } else {

      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number,
          country: obj.country,
          state: obj.state,
          city: obj.city,
          street: obj.street,
          building: obj.building,
          apartment: obj.apartment,
          floor: obj.floor
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 59,
        community_id: "M2Q1r2Y",
        pay_using: "cash"
      }
    }

    console.log(fessObj)
    this.rest.payFess(fessObj)

    this.subscription = this.rest.getToken().subscribe(res => {
      console.log(res)
      if (res.data.iframe_url == null) {

        if (obj.paymentUse == "kiosk") {
          this.penddingMag = res.data.transaction_status
          localStorage.setItem('pendMasgShop', res.data.message);
          localStorage.setItem('statusPaymentShop', 'kiosk');
          localStorage.setItem('uuidPaymentShop', res.data.transaction_uuid);
          localStorage.setItem('transaction_status', res.data.transaction_status);
          
          this.router.navigateByUrl(`/FeesCheck`)
        } else {
          this.penddingMag = res.data.transaction_status
          localStorage.setItem('pendMasgShop', res.data.message);
          localStorage.setItem('statusPaymentShop', 'cash');
          localStorage.setItem('uuidPaymentShop', res.data.transaction_uuid);
          localStorage.setItem('transaction_status', res.data.transaction_status);
          this.router.navigateByUrl(`/FeesCheck`)
        }

      } else {
        localStorage.setItem('statusPaymentShop', 'card');
        localStorage.setItem('uuidPaymentShop', res.data.transaction_uuid);
        localStorage.setItem('transaction_status', res.data.transaction_status);
        this.fessIframe = res.data.iframe_url
        window.location.href = this.fessIframe;
      }
    })
  }

  selctedCash(value) {
    this.showInputsForCash = value
    if (value != 'Cash') {
      this.formBook.patchValue({
        country: "..",
        state: "..",
        city: "..",
        street: "..",
        building: "..",
        apartment: "..",
        floor: "..",
      })
    } else {
      this.formBook.patchValue({
        country: "",
        state: "",
        city: "",
        street: "",
        building: "",
        apartment: "",
        floor: "",
      })
    }
    console.log(this.formBook.value)

  }

  CountPlus(id) {
    for (let i = 0; i < this.arrOFtikets.length; i++) {
      if (id == this.arrOFtikets[i].Id) {
        this.arrOFtikets[i].price = this.arrOFtikets[i].price / this.arrOFtikets[i].Counter
        this.arrOFtikets[i].Counter += 1
        this.arrOFtikets[i].price = this.arrOFtikets[i].price * this.arrOFtikets[i].Counter
        this.total = this.total + (this.arrOFtikets[i].price / this.arrOFtikets[i].Counter)
        localStorage.setItem("arrOFTEvents", JSON.stringify(this.arrOFtikets));
      }
    }

  }

  CountMuins(id) {
    for (let i = 0; i < this.arrOFtikets.length; i++) {

      if (id == this.arrOFtikets[i].Id) {
        if (this.arrOFtikets[i].Counter == 1) {
          break
        } else {
          this.arrOFtikets[i].price = this.arrOFtikets[i].price / this.arrOFtikets[i].Counter
          this.arrOFtikets[i].Counter -= 1
          this.arrOFtikets[i].price = this.arrOFtikets[i].price * this.arrOFtikets[i].Counter
          this.total = this.total - (this.arrOFtikets[i].price / this.arrOFtikets[i].Counter)
          localStorage.setItem("arrOFTEvents", JSON.stringify(this.arrOFtikets));
        }
      }
    }
  }

  updateForm() {
    this.formBook.patchValue({
      name: this.fullName,
      email: this.emailAdress,
    });
  }

}
