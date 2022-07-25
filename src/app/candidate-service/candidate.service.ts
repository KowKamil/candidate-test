import { Injectable } from '@angular/core';
import { Candidate } from '../candidates/candidate';
import { Candidates } from '../mock-candidates';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message-service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidatesUrl = 'api/candidates';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.candidatesUrl).pipe(
      tap((_) => this.log('fetched candidates')),
      catchError(this.handleError<Candidate[]>('getCandidates', []))
    );
  }

  getCandidate(id: number): Observable<Candidate> {
    const url = `${this.candidatesUrl}/${id}`;
    return this.http.get<Candidate>(url).pipe(
      tap((_) => this.log(`fetched candidate id=${id}`)),
      catchError(this.handleError<Candidate>(`getCandidate id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CandidateService: ${message}`);
  }
}
