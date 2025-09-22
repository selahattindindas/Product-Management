import { ChangeDetectionStrategy, Component, inject, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../../core/services/user-auth.service';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../core/models/auth/login';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../../core/services/common/sweetalert.service';
import { ValidationDirective, LoadingDirective } from '../../../shared/directives';
import { AppMessages } from '../../../core/constants/messages';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ValidationDirective, LoadingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private userAuthService = inject(UserAuthService);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const loginData: Login = this.loginForm.value;

      this.userAuthService.login(loginData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            // Token'ın doğru set edildiğini kontrol et
            const token = this.authService.getToken();
            if (token) {
              this.sweetAlertService.showMessage(AppMessages.SUCCESS).then(() => {
                this.router.navigate(['/admin']);
              });
            } else {
              this.errorMessage.set(AppMessages.UNEXPECTED_ERROR);
            }
          },
          error: (err) => {
            this.isLoading.set(false);
            this.errorMessage.set(err.error?.message ?? AppMessages.UNEXPECTED_ERROR);
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private markFormGroupTouched(): void {
    Object.values(this.loginForm.controls).forEach(control => control.markAsTouched());
  }

}
