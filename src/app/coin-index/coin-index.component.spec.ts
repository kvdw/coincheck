import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinIndexComponent } from './coin-index.component';

describe('CoinIndexComponent', () => {
  let component: CoinIndexComponent;
  let fixture: ComponentFixture<CoinIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
