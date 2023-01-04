import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Servic/rest.service';
import { Router, NavigationEnd } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {



  customOptions: OwlOptions = {
    center: true,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    items:2,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  };
  Lang = "1"

  showMasg = false

  Styles: string = "headerh3";

  lang = '1'
  count = '10'
  current = 1
  productArr;
  url
  entityId
  name
  Entiets
  showSlider:boolean = true
  constructor(public rest: RestService, private router: Router, private spinner: NgxSpinnerService ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.getData()
  }
  getData() {
    this.rest.getProduct(this.lang, this.count, this.current,this.entityId).subscribe((res : any) => {
      console.log(res)
        this.productArr = res.products
        this.Entiets = res.EntitiesHaveProducts
        this.spinner.hide();

    })
  }

  getEntity(item,id){

    this.router.navigate(['/shoplist', id]);
    this.rest.sendObsData(item)
  }


  goToDet(id) {
    this.router.navigate(['/productDetalis', id]);
  }


}
