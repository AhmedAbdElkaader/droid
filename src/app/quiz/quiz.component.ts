import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  status:boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  getActiveTtile(){
    this.status = !this.status;
  }

}
