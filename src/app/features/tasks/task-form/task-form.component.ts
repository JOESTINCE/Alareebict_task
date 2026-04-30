import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NotificationService } from '../../../core/services/notification.service';
import { CanComponentDeactivate } from '../../../core/guards/dirty-form.guard';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    PageHeaderComponent,
    FormFieldComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, CanComponentDeactivate {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: string | null = null;
  public today: Date = new Date();
  private isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      assignedTo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      priority: ['Medium', [Validators.required]],
      status: ['Pending', [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      dueDate: [new Date(), [Validators.required]],
      createdAt: [new Date()]
    }, { validators: this.dateRangeValidator });
  }

  get minDueDate(): Date {
    return this.taskForm.get('startDate')?.value || new Date();
  }

  getControl(name: string): FormControl {
    return this.taskForm.get(name) as FormControl;
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      const task = this.taskService.getTaskById(this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      } else {
        this.notification.error('Task not found');
        this.router.navigate(['/tasks']);
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.taskForm.dirty && !this.isSubmitted) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Unsaved Changes',
          message: 'You have unsaved changes. Are you sure you want to leave this page?',
          confirmText: 'Leave',
          cancelText: 'Stay'
        }
      });
      return dialogRef.afterClosed();
    }
    return true;
  }

  dateRangeValidator(group: FormGroup) {
    const start = group.get('startDate')?.value;
    const due = group.get('dueDate')?.value;
    return start && due && due < start ? { dateRange: true } : null;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isSubmitted = true;
      const formValue = this.taskForm.value;
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask({ ...formValue, id: this.taskId });
        this.notification.success('Task updated successfully');
      } else {
        this.taskService.addTask(formValue);
        this.notification.success('Task created successfully');
      }
      this.router.navigate(['/tasks']);
    } else {
      this.notification.error('Please fix the errors in the form');
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
