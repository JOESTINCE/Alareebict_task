import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { authGuard } from '../../core/guards/auth.guard';
import { dirtyFormGuard } from '../../core/guards/dirty-form.guard';

export const TASK_ROUTES: Routes = [
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { path: '', component: TaskListComponent },
      { path: 'new', component: TaskFormComponent, canDeactivate: [dirtyFormGuard] },
      { path: 'edit/:id', component: TaskFormComponent, canDeactivate: [dirtyFormGuard] },
      { path: ':id', component: TaskDetailsComponent }
    ]
  }
];
