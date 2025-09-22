import { Component, OnInit, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthNavComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly isAuthenticated = signal<boolean>(false);
  readonly currentUser = signal<{ fullName: string; role: string } | null>(null);

  ngOnInit(): void {
    this.setupAuthSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private setupAuthSubscription(): void {
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(authState => {
        this.isAuthenticated.set(authState.isAuthenticated);
        this.currentUser.set(authState.currentUser ? {
          fullName: authState.currentUser.fullName,
          role: authState.currentUser.role ?? 'User'
        } : null);
      });
  }
}


