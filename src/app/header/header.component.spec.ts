import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { CoreModule } from '../core.module';
import { DataStorageService } from '../shared/data-storage.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,

        AppRoutingModule,
        SharedModule,
        CoreModule,
      ],
      providers: [DataStorageService, AuthService],
    });
  });

  it('should create the Header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(header).toBeTruthy();
  });

  it('should contain the Authenticate nav item', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(header).toBeTruthy();
  });
});
