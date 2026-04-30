import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { TaskService } from '../../../core/services/task.service';
import { Task, ActivityLog } from '../../../core/models/task.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    StatusBadgeComponent,
    PageHeaderComponent
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;
  history: ActivityLog[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id);
      if (this.task) {
        this.taskService.getActivityLogs(id).subscribe({
          next: (logs) => this.history = logs,
          error: (err) => console.error('Failed to load activity logs:', err)
        });
      } else {
        this.router.navigate(['/tasks']);
      }
    }
  }

  back() {
    this.router.navigate(['/tasks']);
  }

  edit() {
    this.router.navigate(['/tasks/edit', this.task?.id]);
  }
}
