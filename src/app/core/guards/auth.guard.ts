import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Mock authentication check
  const isAuthenticated = true; // Set to true for demonstration
  
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect if not authenticated
    return false;
  }
};
