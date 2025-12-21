import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    // No logueado → puede acceder al login
    return true;
  }

  // Ya logueado → redirige al dashboard
  router.navigate(['/dashboard']);
  return false;
};
