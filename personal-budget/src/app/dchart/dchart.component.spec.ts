import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DchartComponent } from './dchart.component';

describe('DchartComponent', () => {
  let component: DchartComponent;
  let fixture: ComponentFixture<DchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
