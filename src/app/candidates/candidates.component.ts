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

  constructor(
    private candidateService: CandidateService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates(): void {
    this.candidateService
      .getCandidates()
      .subscribe((candidates) => (this.candidates = candidates));
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    let fullName = firstName + ' ' + lastName;
    if (!firstName || !lastName) {
      return;
    }
    this.candidateService
      .addCandidate({ firstName, lastName, fullName } as Candidate)
      .subscribe((candidate) => {
        this.candidates.push(candidate);
      });
  }

  delete(candidate: Candidate): void {
    this.candidates = this.candidates.filter((c) => c !== candidate);
    this.candidateService.deleteCandidate(candidate.id).subscribe();
  }
}
