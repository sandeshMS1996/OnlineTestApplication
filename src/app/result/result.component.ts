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
  constructor() {
    console.log('calling Result constructor', this.result);
  }

  ngOnInit(): void {

  }
}
