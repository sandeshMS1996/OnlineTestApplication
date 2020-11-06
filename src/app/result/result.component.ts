import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Result} from '../quiz/Result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() result: Result = new Result();
  percentage: number;
  resultClass: string;
  constructor() {
    console.log('calling Result constructor', this.result);
  }

  ngOnInit(): void {
    this.percentage =
      Math.ceil((this.result.score / (this.result.quizMetaData.numberOfQuestions)) * 100);
    console.log(this.percentage);
    this.resultClass =  this.getResultClass();
    console.log(this.resultClass);
  }

  getResultClass(): string {
    console.log(this.percentage);
    if (this.percentage <= 25 ) {
      return 'progress-bar bg-danger';
    } else if (this.percentage <= 50 ) {
      return 'progress-bar bg-warning';
    }else if (this.percentage <= 75 ) {
      return 'progress-bar bg-info';
    } else  {
      return 'progress-bar bg-success';
    }

  }
  getResult(): boolean {
    console.log(this.percentage , this.result.quizMetaData.passingPercentage);
    if (this.percentage > 50) {
      console.log('returning true');
      return true;
    } else {
      console.log('returning false');
      return false;
    }
  }
}
