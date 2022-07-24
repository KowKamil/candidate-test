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
}
