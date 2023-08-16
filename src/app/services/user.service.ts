import { Injectable } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { UserQuery } from '../state/query';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userQuery: UserQuery
  ) { }

  checkNameUniqueness(name: string): Observable<boolean> {
    return timer(1000).pipe(
      map(() => {
        const users = this.userQuery.getValue().users;
        return !users.some(user => user.name === name);
      })
    );
  }
}
