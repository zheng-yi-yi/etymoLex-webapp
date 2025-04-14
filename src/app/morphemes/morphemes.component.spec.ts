import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphemesComponent } from './morphemes.component';

describe('MorphemesComponent', () => {
  let component: MorphemesComponent;
  let fixture: ComponentFixture<MorphemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorphemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorphemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
