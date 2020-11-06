import {Component, EventEmitter, OnInit} from '@angular/core';
import {QuizServiceService} from '../quiz-service.service';
import {Question} from './Question';
import {ActivatedRoute, Router} from '@angular/router';
import {InteractionsService} from '../interactions.service';
import {ResultServiceService} from '../result-service.service';
import {Result} from './Result';
import {useAnimation} from '@angular/animations';
import {MasterTestRecord} from '../register/masterTestRecord';
import {Time} from '@angular/common';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private quizService: QuizServiceService, private route: ActivatedRoute,
              private resultService: ResultServiceService, private router: Router) {
    this.quizService.getMasterTestRecord().subscribe((resp: MasterTestRecord[]) => {
      for (const a of resp) {
        if (a.name === this.file.split('.')[0]) {
          this.result1.quizMetaData = a;
          console.log(this.result1.quizMetaData);
        }
      }
    });
    this.startTimer();
  }
  questions: Question[] = [];
  questionNumber = 0;
  questionBeingAnswered: Question;
  selectedOption;
  NumberOfCorrectAnswers = 0;
  NumberOfQuestionsAttended = 0;
  submitAssessment = false;
  file: string;
  timer;
  resultEvent: EventEmitter<Result> =  new EventEmitter<Result>();
  quizEmitter: EventEmitter<string> = new EventEmitter<string>();
  result1 = new Result();
  countDown: any;
  from;
  timerClass = 'btn btn-primary';
  ngOnInit(): void {
    this.file = this.route.snapshot.paramMap.get('quizName').concat('.json');
    this.result1.name = this.route.snapshot.paramMap.get('username');
    console.log(this.result1.name);
    this.quizService.getQuestions(this.file).subscribe((resp: Question[]) => {
      resp.forEach(a => this.questions.push(a));
      console.log(this.questions[0]);
      this.questionBeingAnswered = this.questions[this.questionNumber];
      this.quizEmitter.emit(this.file.split('.')[0]);
    });

  }
  AnswerQuestion(): void {
    this.recordAnswer();
    console.log(this.questionNumber);
    if (this.questionNumber  < this.questions.length - 1  ) {
      this.questionBeingAnswered = this.questions[++this.questionNumber];
    } else {
      console.log('in else block');
      this.questionNumber = 0;
      this.questionBeingAnswered = this.questions[this.questionNumber];
    }
  }

  moveBack(): any {
    this.recordAnswer();
    if (this.questionNumber < 1) {
      this.questionNumber = this.questions.length - 1;
    } else {
      --this.questionNumber;
    }
    this.questionBeingAnswered = this.questions[this.questionNumber];
  }
  recordAnswer(): void {
    console.log(this.selectedOption);
    if (this.questionBeingAnswered.userEnteredAnswer.toLowerCase() === 'z'
    && !(typeof this.selectedOption === 'undefined'))  {
      ++this.NumberOfQuestionsAttended;
    }
    if ( !(typeof this.selectedOption === 'undefined')) {
      this.questionBeingAnswered.userEnteredAnswer = this.selectedOption;
    }
  }
  getProgressPercentage(): string {
    const progress =  Math.floor((this.NumberOfQuestionsAttended / (this.questions.length)) * 100) ;
    return progress.toString().concat('%');
  }

  submitAssesment(): void {
    console.log(this.questions);
    const score = this.questions.filter(question => question.correctAnswer.toUpperCase()
      === question.userEnteredAnswer.toUpperCase())
      .length;
    this.result1.score = score;
    console.log(this.result1);
    this.resultEvent.emit(this.result1);
    this.submitAssessment = true;
  }

  startTimer(): void {
    console.log(this.questions.length);
    this.from  = new Date().getTime() + (1000 * 60 * 1);
    const x =  setInterval(() => {
      const to = new Date().getTime();
      console.log(to, ' ', this.from) ;
      const distance = this.from - to;
      console.log(distance);
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / (1000));
      const  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      console.log(seconds, ' ', minutes, ' ', hours);
      const y = `${hours}:${minutes}:${seconds}`;
      console.log(y);
      this.countDown = y;
      if (minutes < 3) {
        this.timerClass = 'btn btn-danger';
      }
      if (minutes === 0 && seconds === 0 ) {
        this.submitAssesment();
      }
    }, 1000);
  }
}
