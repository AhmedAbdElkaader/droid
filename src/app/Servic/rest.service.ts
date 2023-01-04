import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private subject = new Subject<any>();
  private NewSubject = new Subject<any>();
  private NewSubjectForAdress = new Subject<any>();

  constructor(private http: HttpClient) { }


  getProduct(langId,count, CurrentPage, entity) {
    return this.http.get(`${environment.baseUrl}/api/Products/GetAllProducts/${langId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${entity}`)
  }

  getPrdouctDet(langId,id) {
    return this.http.get(`${environment.baseUrl}/api/Products/GetProductsDetails/${langId}/${id}`)
  }
    // getNumbersUrl(ItemId){
    //   return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/IncreaseReadNumber?ItemId=${ItemId}`)
    // }
    getEntityId(webName){
     let langId = 1
      return this.http.get(`${environment.baseUrl}/api/Home/GetEntityIdBySiteName/${langId}?webName=${webName}`)
    }
   

    //login and register 
    registerApi(obj) {
      this.http.post(`${environment.baseUrl}/api/Account/Register`, obj).subscribe(res => {
        console.log(res)
        if (res) {
          this.sendToken(res)
        }
      })
    }
    loginApi(obj) {
      this.http.post(`${environment.baseUrl}/api/Account/LogIn`, obj).subscribe((res: any) => {
        console.log(res)
        if (res) {
          this.sendToken(res)
        }
      })
    }

    getUserInfo(accToken) {

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `bearer ${accToken}`);
      return this.http.get(`${environment.baseUrl}/api/Account/GetIntellactaulData`, { headers: headers })
    }

    // payemnt
    
    
    payFess(obj){
      let headers = new HttpHeaders();
      headers = headers.set('x-api-key','ohTs8M1g.qrJKGBL0cMABP7xhm8Qh4r9rEHdRJ10F');
       this.http.post('https://staging.xpay.app/api/v1/payments/pay/variable-amount',obj,{headers: headers}).subscribe(res => {
        console.log('fess response is ' , res)
        this.sendToken(res)
      })
    }
    
    checkFessIfPayed(){
      const uuid = localStorage.getItem('myUUIDShop');
      let headers = new HttpHeaders();
      headers = headers.set('x-api-key','ohTs8M1g.qrJKGBL0cMABP7xhm8Qh4r9rEHdRJ10F');
       return this.http.get(`https://staging.xpay.app/api/v1/communities/M2Q1r2Y/transactions/${uuid}/`,{headers: headers})
    }

    sendDataFromuser(obj){
      let headers = new HttpHeaders();
       this.http.post('https://api.cg.eg/api/Products/MakeanOrder',obj).subscribe(res => {
        console.log('hello iam user' , res)
        this.sendIfAdressDone(res)
      })
    }
    

  sendToken(events) {
    this.NewSubject.next(events)
  }
  getToken(): Observable<any> {
    return this.NewSubject.asObservable()
  }



  sendIfAdressDone(events) {
    this.NewSubjectForAdress.next(events)
  }
  getIfAdressDone(): Observable<any> {
    return this.NewSubjectForAdress.asObservable()
  }
  


    sendObsData(event) {
      this.subject.next(event);
    }
  
    getObsData(): Observable<any> {
      return  this.subject.asObservable();
    }




}
