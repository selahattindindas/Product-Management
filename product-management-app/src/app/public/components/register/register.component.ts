import { ChangeDetectionStrategy, Component, inject, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../../core/services/user-auth.service';
import { Register } from '../../../core/models/auth/register';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../../core/services/common/sweetalert.service';
import { ValidationDirective, LoadingDirective } from '../../../shared/directives';
import { AppMessages } from '../../../core/constants/messages';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ValidationDirective, LoadingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private userAuthService = inject(UserAuthService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const registerData: Register = {
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.userAuthService.register(registerData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.sweetAlertService.showMessage().then(() => {
              this.router.navigate(['/login']);
            });
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
    Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());
  }

}
