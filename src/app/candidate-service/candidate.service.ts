import { Injectable } from '@angular/core';
import { Candidate } from '../candidates/candidate';
import { Candidates } from '../mock-candidates';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor() {}

  getCandidates(): Observable<Candidate[]> {
    const candidates = of(Candidates);
    return candidates;
  }
}
