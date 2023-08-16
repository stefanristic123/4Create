import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models';
import { UserQuery, UserStore } from '../state';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy{
  dataSource = new MatTableDataSource([])
  displayedColumns: string[] = ['id', 'name', 'active'];
  private getUsersSubscription: Subscription | undefined;
  addUserDisabled$ = this.userQuery.allActiveUsers$.pipe(map(val => !val));

  constructor(
    private userQuery: UserQuery,
    private userStore: UserStore,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.getUsersSubscription = this.userQuery.getUsers().subscribe((data: any) => {
      this.dataSource = data;
    })
  }

  openDialog(){
    this.dialog.open(UserFormModalComponent,{
      data: this.dataSource
    });
  }

  toggleActive(user: User): void {
    const updatedUser = { ...user, active: !user.active };
    this.userStore.update(state => ({
      users: state.users.map(u => (u.id === user.id ? updatedUser : u))
    }));
  }

  ngOnDestroy(){
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }
}
