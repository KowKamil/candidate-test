import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../candidates/candidate';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CandidateService } from '../candidate-service/candidate.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css'],
})
export class CandidateDetailComponent implements OnInit {
  @Input() public candidate?: Candidate;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private location: Location
  ) {}

  public ngOnInit(): void {
    this.getCandidate();
  }

  getCandidate(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.candidateService
      .getCandidate(id)
      .subscribe((candidate) => (this.candidate = candidate));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.candidate) {
      this.candidateService
        .updateCandidate(this.candidate)
        .subscribe(() => this.goBack());
    }
  }
}
