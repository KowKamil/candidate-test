import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate-service/candidate.service';
import { MessageService } from '../message-service/message.service';
import { Candidate } from './candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  selectedCandidate?: Candidate;

  constructor(
    private candidateService: CandidateService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  onSelect(candidate: Candidate): void {
    if (candidate === this.selectedCandidate) {
      let deselectedCandidate = this.selectedCandidate;
      this.selectedCandidate = undefined;
      this.messageService.add(
        `CandidateComponent: Deselected candidate id=${deselectedCandidate.id}`
      );
    } else {
      this.selectedCandidate = candidate;
      this.messageService.add(
        `CandidateComponent: Selected candidate id=${candidate.id}`
      );
    }
  }

  getCandidates(): void {
    this.candidateService
      .getCandidates()
      .subscribe((candidates) => (this.candidates = candidates));
  }
}
