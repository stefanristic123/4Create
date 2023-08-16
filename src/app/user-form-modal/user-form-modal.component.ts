import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models';
import { UserStore } from '../state';
import { UserService } from '../services';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit{
  userForm!: FormGroup;
  private nextUserId!: number;
  
  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[],
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required], [this.asyncNameValidator()]],
      active: [false]
    });
    this.nextUserId = this.data.length > 0 ? this.data[this.data.length - 1].id! + 1 : 3; // 3 as default value based on nuber of users in stor
  }

  onSubmit(): void {
    const newUser = {
      id: this.nextUserId,
      ...this.userForm.value
    };
    this.userStore.add(newUser);
    this.dialogRef.close();
  }

  private asyncNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.checkNameUniqueness(control.value).pipe(
        map(isUnique => (isUnique ? null : { uniqueName: true }))
      );
    };
  }
}
