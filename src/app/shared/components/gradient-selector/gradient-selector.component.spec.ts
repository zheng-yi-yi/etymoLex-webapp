import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientSelectorComponent } from './gradient-selector.component';

describe('GradientSelectorComponent', () => {
  let component: GradientSelectorComponent;
  let fixture: ComponentFixture<GradientSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
