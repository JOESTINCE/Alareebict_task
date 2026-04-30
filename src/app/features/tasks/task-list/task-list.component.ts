import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../core/services/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    DataTableComponent,
    StatusBadgeComponent,
    PageHeaderComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  @ViewChild('taskTable') taskTable!: DataTableComponent<Task>;

  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  
  searchQuery: string = '';
  statusFilter: string = 'all';
  priorityFilter: string = 'all';

  columns: TableColumn[] = [
    { key: 'title', label: 'Task Title' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'priority', label: 'Priority', type: 'custom' },
    { key: 'status', label: 'Status', type: 'custom' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.notification.error('Failed to load tasks. Please try again later.');
      }
    });
  }

  applyFilters() {
    this.filteredTasks = this.allTasks.filter(task => {
      const matchesSearch = !this.searchQuery || 
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || task.status === this.statusFilter;
      const matchesPriority = this.priorityFilter === 'all' || task.priority === this.priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  viewTask(task: Task) {
    this.router.navigate(['/tasks', task.id]);
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id);
        this.notification.success('Task deleted successfully');
      }
    });
  }

  updateTaskStatus(task: Task, newStatus: string) {
    const updatedTask = { ...task, status: newStatus as any };
    this.taskService.updateTask(updatedTask);
    this.notification.success(`Status updated to ${newStatus}`);
  }

  updateTaskPriority(task: Task, newPriority: string) {
    const updatedTask = { ...task, priority: newPriority as any };
    this.taskService.updateTask(updatedTask);
    this.notification.success(`Priority updated to ${newPriority}`);
  }
}
