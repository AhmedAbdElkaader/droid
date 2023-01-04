import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/Servic/rest.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  id
  current = 1
  count = 6
  lang = 1
  productArr
  constructor(public rest: RestService,
    private router: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.rest.getProduct(this.lang, this.count, this.current, this.id).subscribe((res: any) => {
        console.log(res)
        this.productArr = res.products
        this.spinner.hide();
      })
    })
  }


  goToDet(id) {
    this.route.navigate(['/productDetalis', id]);
  }


}
