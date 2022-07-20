import { Component, OnInit } from '@angular/core';
import { Candidate } from './candidate';
import { Candidates } from '../mock-candidates';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit {
  title = 'Candidates';
  candidates = Candidates;

  constructor() {}

  ngOnInit(): void {}

  selectedCandidate?: Candidate;

  onSelect(candidate: Candidate): void {
    if (candidate === this.selectedCandidate)
      this.selectedCandidate = undefined;
    else this.selectedCandidate = candidate;
  }
}
