import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Servic/rest.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fees-check',
  templateUrl: './fees-check.component.html',
  styleUrls: ['./fees-check.component.css']
})
export class FeesCheckComponent implements OnInit {
  
  subscription: Subscription;
  masgeIFdone
  fessIsPayed = false
  statusPayment
  masgeOfPay
  masge;
  arrOFtikets
  formForPayment: FormGroup
  uuidShop
  productOrderQties = []
  accToken
  transactionStatus
  showButtonOfAdress = true
  constructor(private rest: RestService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.accToken = localStorage.getItem('tokenDataOfShop')

    this.formForPayment = new FormGroup({
      ClientName: new FormControl("ahmed", Validators.required),
      Email: new FormControl("ahmedm1@gmail.com", Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      City: new FormControl("alex", Validators.required),
      Distinct: new FormControl("miami", Validators.required),
      StreetName: new FormControl("sdsa asd", Validators.required),
      BuldNo: new FormControl("", Validators.required),
      FloorNo: new FormControl("", Validators.required),
      FlatNo: new FormControl("", Validators.required),
      SpecificSign: new FormControl(null),
      otherPhone: new FormControl(null)
    })

    this.SpinnerService.show();

    this.statusPayment = localStorage.getItem('statusPaymentShop');
    this.transactionStatus = localStorage.getItem('transaction_status');

    this.masgeOfPay = localStorage.getItem('pendMasgShop');


    if (this.statusPayment == "card") {
      this.showButtonOfAdress = true
      this.masge = "لقد تم الدفع"
      this.SpinnerService.hide();
    } else if (this.statusPayment == "kiosk") {
      this.showButtonOfAdress = true
      this.masge = this.masgeOfPay
      console.log(this.masge)
      console.log(this.masge.length)
      let lnght = this.masge.length 
      this.masge = "يرجى الذهاب إلى أقرب كشك أمان والدفع باستخدام هذا الرقم" + "<br>" + this.masge.slice(lnght - 9, lnght)
      console.log(this.masge)
      this.SpinnerService.hide();
    }else if(this.statusPayment == "cash"){
      this.showButtonOfAdress = true
      this.SpinnerService.hide();
      this.masge = "سيكون لدينا ممثل يذهب إلى العنوان الذي قدمته لجمع النقدية "
    }else{
      this.SpinnerService.hide();
      this.showButtonOfAdress = false
      this.masge = 'لا يوجد اي معاملات'
    }
  }

  sendUserAdress(){

    this.SpinnerService.show();

    this.arrOFtikets = JSON.parse(localStorage.getItem("arrOFTEvents"));
    this.uuidShop = localStorage.getItem('uuidPaymentShop')
    let obj = this.formForPayment.value

    if(this.statusPayment == "kiosk"){
      obj.PaidwayId = 2
      obj.PaymentStatusId = 1
    }else if (this.statusPayment == "card"){
      obj.PaidwayId = 1

    }else{
      obj.PaidwayId = 3
    }

    if(this.transactionStatus == "PENDING"){
      obj.PaymentStatusId = 2
    }else if (this.transactionStatus == "ACCEPTED"){
      obj.PaymentStatusId = 1
    }else {
      obj.PaymentStatusId = 3
    }


    obj.ID = 0
    obj.requestTime = new Date()
    obj.TransctionNo = this.uuidShop
    obj.Governates = "Egypt"
    for (let i = 0; i < this.arrOFtikets.length; i++) {
      let objDumm = {
        ProductId:this.arrOFtikets[i].Id,
        Product: {
          ArabicName: this.arrOFtikets[i].Title
        },
        Qty: this.arrOFtikets[i].Quantity,
        TotlalMoney: this.arrOFtikets[i].price
      }
      this.productOrderQties.push(objDumm)
    }
    obj.productOrderQties = this.productOrderQties
 
    console.log(obj)

  
    this.rest.sendDataFromuser(obj)

    this.subscription = this.rest.getIfAdressDone().subscribe(res => {
      this.SpinnerService.hide();
      console.log(res)
      if(res.Text == "Don"){
        this.masgeIFdone = "سيتم التواصل معك في اقرب  وقت"
        let elment: HTMLElement = document.getElementById('myModalaaa') as HTMLElement
        elment.click()
      }else{
        this.masgeIFdone = "لقد حدث خطأ برجاء المحاولة مرة اخري"
        let elment: HTMLElement = document.getElementById('myModalaaa') as HTMLElement
        elment.click()
      }
    })

    localStorage.removeItem("arrOFTEvents");
    localStorage.removeItem("statusPaymentShop");
    localStorage.removeItem("transaction_status");
    localStorage.removeItem("pendMasgShop");
    localStorage.removeItem("uuidPaymentShop");

  }

}