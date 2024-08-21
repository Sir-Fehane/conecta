import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendManagerComponent } from './friend-manager.component';

describe('FriendManagerComponent', () => {
  let component: FriendManagerComponent;
  let fixture: ComponentFixture<FriendManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
