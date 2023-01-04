import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/Servic/rest.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  form: FormGroup;
  formLogin : FormGroup;
  showTab : boolean = true

  
  constructor(public rest :RestService ,private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      UserName: new FormControl("", Validators.required),
      Email: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required),
      ConfirmPassword: new FormControl("", Validators.required),
    })
    this.formLogin = new FormGroup({
      username : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    })
  }

  register(){
    let obj = this.form.value
    console.log(obj)
    this.rest.registerApi(obj)
    this.spinner.show();
  }

  login(){
    let obj = this.formLogin.value
    this.rest.loginApi(obj)
    this.spinner.show();
  }
}
