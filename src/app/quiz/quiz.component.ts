import { Component, OnInit } from '@angular/core';
import {QuizServiceService} from '../quiz-service.service';
import {Question} from './Question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  isQuizStarted = false;
  questionNumber = 0;
  questionBeingAnswered: Question;
  selectedOption;
  constructor(private quizService: QuizServiceService) { }

  ngOnInit(): void {
    this.quizService.getQuestions('test.json').subscribe((resp: Question[]) => {
      resp.forEach(a => this.questions.push(a));
    });
  }
  startQuiz(): any {
    this.isQuizStarted = true;
    console.log(this.questions.length);
    this.questionBeingAnswered = this.questions[0];
  }

  AnswerQuestion(): void {
    console.log(this.selectedOption);
    this.questions[this.questionNumber].userEnteredQuestion = this.selectedOption;
    if ((this.questionNumber + 1) < this.questions.length) {
      this.questionNumber += 1;
      this.questionBeingAnswered = this.questions[this.questionNumber];
      console.log(this.questions);
    }
  }
}
