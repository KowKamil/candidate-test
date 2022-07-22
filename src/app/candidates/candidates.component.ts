import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate-service/candidate.service';
import { Candidate } from './candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[] = [];

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  selectedCandidate?: Candidate;

  onSelect(candidate: Candidate): void {
    if (candidate === this.selectedCandidate)
      this.selectedCandidate = undefined;
    else this.selectedCandidate = candidate;
  }

  getCandidates(): void {
    this.candidateService
      .getCandidates()
      .subscribe((candidates) => (this.candidates = candidates));
  }
}
