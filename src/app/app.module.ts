import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { VideosListComponent } from './Pages/videos-list/videos-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosDetComponent } from './Detels/videos-det/videos-det.component';
import { HeaderComponent } from './Pages/header/header.component';
import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CheckOutComponent } from './Pages/check-out/check-out.component';
import { SingInComponent } from './Pages/sing-in/sing-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeesCheckComponent } from './Pages/fees-check/fees-check.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
// import { QuizAddContentComponent } from './quiz-add-content/quiz-add-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    VideosListComponent,
    VideosDetComponent,
    HeaderComponent,
    ShopListComponent,
    CheckOutComponent,
    SingInComponent,
    FeesCheckComponent,
    QuizComponent,
    QuizDetailsComponent,
    // QuizAddContentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    NgxNewstickerAlbeModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
