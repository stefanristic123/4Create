import { Component } from '@angular/core';
import { UserQuery } from '../state/query';
import { User } from '../models/user.model';
import { UserStore } from '../state/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  dataSource = new MatTableDataSource([])
  displayedColumns: string[] = ['id', 'name', 'active'];
  addUserDisabled$ = this.userQuery.allActiveUsers$.pipe(map(val => !val));

  constructor(
    private userQuery: UserQuery,
    private userStore: UserStore,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.userQuery.getUsers().subscribe((data: any) => {
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
}
