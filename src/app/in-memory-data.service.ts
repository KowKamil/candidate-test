import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Candidate } from './candidates/candidate';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const candidates: Candidate[] = [
      { id: 10, firstName: 'Cotton', lastName: 'Mather' },
      { id: 11, firstName: 'Deodat', lastName: 'Lawson' },
      { id: 12, firstName: 'Edward', lastName: 'Bishop' },
      { id: 13, firstName: 'Giles', lastName: 'Corey' },
      { id: 14, firstName: 'James', lastName: 'Bayley' },
      { id: 15, firstName: 'James', lastName: 'Russel' },
      { id: 16, firstName: 'John', lastName: 'Hathorne' },
      { id: 17, firstName: 'John', lastName: 'Proctor' },
      { id: 18, firstName: 'John', lastName: 'Willard' },
      { id: 19, firstName: 'Jonathan', lastName: 'Corwin' },
      { id: 20, firstName: 'Samuel', lastName: 'Parris' },
    ];
    return { candidates };
  }

  // Overrides the genId method to ensure that a candidate always has an id.
  // If the candidates array is empty,
  // the method below returns the initial number (11).
  // if the candidates array is not empty, the method below returns the highest
  // candidate id + 1.
  genId(candidates: Candidate[]): number {
    return candidates.length > 0
      ? Math.max(...candidates.map((candidate) => candidate.id)) + 1
      : 11;
  }
}
