import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from 'src/app/models/user.model';

export interface UserState {
  users: User[];
}

export function createInitialState(): UserState {
  return {
    users: [
      { id: 1, name: 'User 1', active: true },
      { id: 2, name: 'User 2', active: true },
      { id: 3, name: 'User 3', active: true },
    ]
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }

  add(user: User): void {
    this.update(state => ({
      users: [...state.users, user]
    }));
  }
}