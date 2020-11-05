import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
  private subject =  new Subject<string>();
  constructor() { }

  sendResult(data: string): void {
    console.log('sent esg ', data);
    this.subject.next(data);
  }
  receiveResult(): Observable<any> {
    console.log('called recieve result');
    return  this.subject.asObservable();
  }
}
