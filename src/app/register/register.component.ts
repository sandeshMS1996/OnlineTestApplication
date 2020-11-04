import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {QuizServiceService} from '../quiz-service.service';
import {MasterTestRecord} from './masterTestRecord';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDetails: any = {
    name:  '',
    email: ''
  };
  quiz: MasterTestRecord[] = [];
  isRegistered = false;
  constructor(private router: Router, private quizService: QuizServiceService) {
  }

  ngOnInit(): void {
    this.quizService.getMasterTestRecord().subscribe((resp: MasterTestRecord[]) => {
      resp.forEach(a => this.quiz.push(a));
    });
  }
  onSubmit(value: any): any {
    this.router.navigate(['/quiz', 'test']);
  }
  onRegistration(value: any): any {
    this.isRegistered = true;
  }
}
