import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../candidates/candidate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css'],
})
export class CandidateDetailComponent implements OnInit {
  @Input() candidate?: Candidate;

  constructor() {}

  ngOnInit(): void {}
}
