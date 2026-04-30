import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';
import { dirtyFormGuard } from '../../core/guards/dirty-form.guard';

export const TASK_ROUTES: Routes = [
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./task-list/task-list.component').then(c => c.TaskListComponent) },
      { path: 'new', loadComponent: () => import('./task-form/task-form.component').then(c => c.TaskFormComponent), canDeactivate: [dirtyFormGuard] },
      { path: 'edit/:id', loadComponent: () => import('./task-form/task-form.component').then(c => c.TaskFormComponent), canDeactivate: [dirtyFormGuard] },
      { path: ':id', loadComponent: () => import('./task-details/task-details.component').then(c => c.TaskDetailsComponent) }
    ]
  }
];
