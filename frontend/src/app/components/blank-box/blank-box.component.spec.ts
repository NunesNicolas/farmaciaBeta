import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankBoxComponent } from './blank-box.component';

describe('BlankBoxComponent', () => {
  let component: BlankBoxComponent;
  let fixture: ComponentFixture<BlankBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
