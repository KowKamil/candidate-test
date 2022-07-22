import { Injectable } from '@angular/core';
import { Candidate } from '../candidates/candidate';
import { Candidates } from '../mock-candidates';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(private messageService: MessageService) {}

  getCandidates(): Observable<Candidate[]> {
    const candidates = of(Candidates);
    this.messageService.add('CandidateService: fetched candidates.');
    return candidates;
  }
}
