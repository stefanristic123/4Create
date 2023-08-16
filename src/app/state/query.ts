import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Query } from '@datorama/akita';
import { UserState, UserStore } from './store';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  getUsers(): Observable<User[]> {
    return this.select(state => state.users);
  }

  isNameUnique(name: string): Observable<boolean> {
    return this.select(state => state.users).pipe(
      map(users => !users.some(user => user.name === name))
    );
  }

  allActiveUsers$: Observable<boolean> = this.select(state =>
    state.users.length < 5 && state.users.every(user => user.active)
  );
}