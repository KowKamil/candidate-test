import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Candidate } from '../candidates/candidate';
import { CandidateService } from '../candidate-service/candidate.service';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.css'],
})
export class CandidateSearchComponent implements OnInit {
  candidates$!: Observable<Candidate[]>;
  private searchTerms = new Subject<string>();
  debounceTimeInMiliseconds = 300;

  constructor(private candidateService: CandidateService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.candidates$ = this.searchTerms.pipe(
      debounceTime(this.debounceTimeInMiliseconds),
      //ignore new term if same as previous term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      switchMap((term: string) => this.candidateService.searchCandidates(term))
    );
  }
}
