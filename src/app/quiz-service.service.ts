import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Question} from './quiz/Question';
import {Observable} from 'rxjs';
import {MasterTestRecord} from './register/masterTestRecord';
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

  public getMasterTestRecord(): Observable<MasterTestRecord[]> {
    const records: MasterTestRecord[] = [];
    return this.http.get<MasterTestRecord[]>('/assets/masterRecord.json');
  }
  /*public getMasterTetByName(quizName: string): MasterTestRecord {
    console.log(quizName);
    const records: MasterTestRecord[] = [];
    this.http.get<MasterTestRecord[]>('/assets/masterRecord.json').subscribe(
      (data: MasterTestRecord[]) => {
        data.forEach(a => records.push(a));
      });
    console.log(records);
    const masterTestRecords = records.filter(a => a.name === quizName);
    console.log(masterTestRecords);
    return masterTestRecords[0];
  }*/
}
