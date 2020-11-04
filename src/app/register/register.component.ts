import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(value: any): any {
    console.log(value);
    const promise = this.router.navigate(['/quiz']);
    return promise;
  }
}
