import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Injectable} from '@angular/core';

import {Loan} from '../model/loan';
import {BaseHttpService} from './baseHttpService';

@Injectable()
export class LoanService extends BaseHttpService {
  public getAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }

  public return(loanId): Observable<void> {
    return this.http.delete(`${this.baseUrl}/loans/${loanId}`)
      .pipe(map(() => null), catchError((err) => {
        console.log(err);
        return null;
      }));
  }

  loan(bookId, copyId, userId): Observable<void> {
    return this.http.post(`${this.baseUrl}/loans`, {
      'copyId': copyId,
      'userId': userId,
      'bookId': bookId
    }).pipe(map(() => null), catchError((err) => {
      console.log(err);
      return null;
    }));
  }
}
