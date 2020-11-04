import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Question} from './quiz/Question';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  public questions = [];

  constructor(private http: HttpClient) {
  }

  public getQuestions(fileName: string): Observable<Question[]> {
    const questions: Question[] = [];
    console.log('questions');
    const myUrl: string = 'assets/'.concat(fileName);
    return this.http.get<Question[]>(myUrl);
  }
}
