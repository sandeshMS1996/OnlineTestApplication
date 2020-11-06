import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizServiceService} from '../quiz-service.service';
import {MasterTestRecord} from './masterTestRecord';
import {InteractionsService} from '../interactions.service';

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
  userName: string;
  quiz: MasterTestRecord[] = [];
  isRegistered = false;
  dataEminnter: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router, private quizService: QuizServiceService,
              private interactionService: InteractionsService) {
  }

  ngOnInit(): void {
    this.quizService.getMasterTestRecord().subscribe((resp: MasterTestRecord[]) => {
      resp.forEach(a => this.quiz.push(a));
    });
  }
  onSubmit(value: any): any {
    this.interactionService.sendName(this.userDetails.name);
    console.log('passing data to navbar', this.userDetails.name);
    this.router.navigate(['/quiz', value, {username: this.userDetails.name}]);

  }
  onRegistration(value: any): any {
    this.dataEminnter.emit(this.userDetails.name);
    this.isRegistered = true;

  }
}
