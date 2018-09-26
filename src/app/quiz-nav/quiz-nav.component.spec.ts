
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuizNavComponent } from './quiz-nav.component';

describe('QuizNavComponent', () => {
  let component: QuizNavComponent;
  let fixture: ComponentFixture<QuizNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [QuizNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
