import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormModalComponent } from './user-form-modal.component';

describe('UserFormModalComponent', () => {
  let component: UserFormModalComponent;
  let fixture: ComponentFixture<UserFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormModalComponent]
    });
    fixture = TestBed.createComponent(UserFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
