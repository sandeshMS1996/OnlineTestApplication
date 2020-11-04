import { Component, OnInit } from '@angular/core';
import {QuizServiceService} from '../quiz-service.service';
import {Question} from './Question';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  questionNumber = 0;
  questionBeingAnswered: Question;
  selectedOption;
  NumberOfCorrectAnswers = 0;
  NumberOfQuestionsAttended = 0;
  repeatedTry = false;
  file: string;
  constructor(private quizService: QuizServiceService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.file = this.route.snapshot.paramMap.get('quizName').concat('.json');
    this.quizService.getQuestions(this.file).subscribe((resp: Question[]) => {
      resp.forEach(a => this.questions.push(a));
      console.log(this.questions[0]);
      this.questionBeingAnswered = this.questions[0];
    });
  }
  AnswerQuestion(): void {
    this.recordAnswer();
    if (this.questionNumber + 1 < this.questions.length ) {
      this.questionBeingAnswered = this.questions[++this.questionNumber];
    } else {
      this.questionBeingAnswered = this.questions[0];
    }
  }

  moveBack(): any {
    this.recordAnswer();
    console.log(this.selectedOption);
    if (this.questionNumber < 1) {
      this.questionNumber = this.questions.length - 1;
    } else {
      --this.questionNumber;
    }
    this.questionBeingAnswered = this.questions[this.questionNumber];
  }
  recordAnswer(): void {
    console.log(this.selectedOption);
    if (this.questionBeingAnswered.userEnteredAnswer.toLowerCase() === 'z') {
      ++this.NumberOfQuestionsAttended;
    }
    this.questionBeingAnswered.userEnteredAnswer = this.selectedOption;
  }
}
