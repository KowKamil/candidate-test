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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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

  updateCandidate(candidate: Candidate): Observable<any> {
    return this.http.put(this.candidatesUrl, candidate, this.httpOptions).pipe(
      tap((_) => this.log(`updated candidate id=${candidate.id}`)),
      catchError(this.handleError<any>('updateCandidate'))
    );
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http
      .post<Candidate>(this.candidatesUrl, candidate, this.httpOptions)
      .pipe(
        tap((newCandidate: Candidate) =>
          this.log(`added candidate w/ id=${newCandidate.id}`)
        ),
        catchError(this.handleError<Candidate>('addCandidate'))
      );
  }

  deleteCandidate(id: number): Observable<Candidate> {
    const url = `${this.candidatesUrl}/${id}`;
    return this.http.delete<Candidate>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted candidate id=${id}`)),
      catchError(this.handleError<Candidate>('deleteCandidate'))
    );
  }

  searchCandidates(term: string): Observable<Candidate[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Candidate[]>(`${this.candidatesUrl}/?firstName=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found candidates matching "${term}"`)
            : this.log(`no candidates matching "${term}"`)
        ),
        catchError(this.handleError<Candidate[]>('searchCandidates', []))
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
