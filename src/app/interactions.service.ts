import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  private subject =  new Subject<string>();
  constructor() { }

  sendName(name: string): void {
    console.log('received message ', name );
    this.subject.next(name);
  }
  receiveName(): Observable<any> {

    return  this.subject.asObservable();
  }
}
