import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarUsersComponent } from './similar-users.component';

describe('SimilarUsersComponent', () => {
  let component: SimilarUsersComponent;
  let fixture: ComponentFixture<SimilarUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
