import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosDetComponent } from './Detels/videos-det/videos-det.component';
import { VideosListComponent } from './Pages/videos-list/videos-list.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { CheckOutComponent } from './Pages/check-out/check-out.component';
import { FeesCheckComponent } from './Pages/fees-check/fees-check.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizComponent } from './quiz/quiz.component';


const routes: Routes = [
  { path: "", component: QuizComponent },
  { path: "product", component: VideosListComponent },
  { path: "FeesCheck", component: FeesCheckComponent },
  { path: "cheackOut", component: CheckOutComponent },
  { path: 'productDetalis/:id', component: VideosDetComponent },
  { path: 'shoplist/:id', component: ShopListComponent },
  { path: 'quiz_details', component: QuizDetailsComponent },
  { path: 'quiz', component: QuizComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
