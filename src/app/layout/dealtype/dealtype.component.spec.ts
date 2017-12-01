import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealtypeComponent } from './dealtype.component';

describe('DealtypeComponent', () => {
  let component: DealtypeComponent;
  let fixture: ComponentFixture<DealtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
