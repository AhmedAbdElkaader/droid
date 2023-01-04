import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {

  status = "1"
  menustatus = "1"
  sideLeftMenu = "1"
  QuestionTtile = ""
  questionName: string = "Hello waht is your name ?";
  choicse = [
    'answer 1', "answer 2"
  ]
  statment = ["Yes", "No"]

  yourNameQuest = ["short text answer"]

  arrIn = this.choicse

  arrOfQuestion = [
    {
      name : "Hello waht is your name ?",
      id : "1"
    },
    {
      name : "is statment true ?",
      id : "2"
    },
    {
      name : "Choose the right answer",
      id : "3"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeActiveLi(number, question) {
    this.status = number
    this.questionName = question
    if (number == "1") {
      this.arrIn = this.choicse
    } else if (number == "2") {
      this.arrIn = this.statment
    } else {
      this.arrIn = this.yourNameQuest
    }
  }

  changeMenuActive(number) {
    this.menustatus = number
  }

  changeSidLeftMenu(number) {
    this.sideLeftMenu = number
  }

  addQuest(){
    this.arrOfQuestion.push({
      name :this.QuestionTtile,
      id:"4"
    })
  }

}
