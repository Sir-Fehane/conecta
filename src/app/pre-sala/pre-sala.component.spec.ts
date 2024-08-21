import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSalaComponent } from './pre-sala.component';

describe('PreSalaComponent', () => {
  let component: PreSalaComponent;
  let fixture: ComponentFixture<PreSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
