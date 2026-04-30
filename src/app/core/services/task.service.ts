import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Task, ActivityLog } from '../models/task.model';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: '1', title: 'Design System Update', description: 'Update the core brand color palette and typography across all design files.', assignedTo: 'John Doe', priority: 'High', status: 'Pending', startDate: new Date('2026-04-01'), dueDate: new Date('2026-04-15'), createdAt: new Date('2026-03-25') },
    { id: '2', title: 'Mobile App Bugfix', description: 'Fix the critical navigation crash occurring on iOS devices.', assignedTo: 'Jane Smith', priority: 'Medium', status: 'Pending', startDate: new Date('2026-04-05'), dueDate: new Date('2026-04-20'), createdAt: new Date('2026-03-28') },
    { id: '3', title: 'API Documentation', description: 'Complete the documentation for the new authentication endpoints.', assignedTo: 'Mike Ross', priority: 'Low', status: 'Completed', startDate: new Date('2026-03-10'), dueDate: new Date('2026-03-20'), createdAt: new Date('2026-03-05') },
    { id: '4', title: 'Frontend Refactoring', description: 'Migrate old class components to functional components with hooks.', assignedTo: 'Sarah Connor', priority: 'High', status: 'Pending', startDate: new Date('2026-04-10'), dueDate: new Date('2026-05-01'), createdAt: new Date('2026-04-01') },
    { id: '5', title: 'Database Optimization', description: 'Optimize slow performing queries in the production database.', assignedTo: 'John Doe', priority: 'High', status: 'Pending', startDate: new Date('2026-04-12'), dueDate: new Date('2026-04-25'), createdAt: new Date('2026-04-05') },
    { id: '6', title: 'Security Audit', description: 'Perform a comprehensive security scan of the entire infrastructure.', assignedTo: 'Alice Wong', priority: 'High', status: 'Pending', startDate: new Date('2026-05-01'), dueDate: new Date('2026-05-15'), createdAt: new Date('2026-04-15') },
    { id: '7', title: 'E2E Test Suite', description: 'Implement Cypress tests for the checkout flow.', assignedTo: 'Bob Vance', priority: 'Medium', status: 'Completed', startDate: new Date('2026-03-15'), dueDate: new Date('2026-03-30'), createdAt: new Date('2026-03-10') },
    { id: '8', title: 'Marketing Landing Page', description: 'Build a new responsive landing page for the spring campaign.', assignedTo: 'Charlie Brown', priority: 'Low', status: 'Pending', startDate: new Date('2026-04-18'), dueDate: new Date('2026-05-05'), createdAt: new Date('2026-04-10') },
    { id: '9', title: 'Legacy Data Migration', description: 'Migrate user data from the old SQL server to the new cluster.', assignedTo: 'Sarah Connor', priority: 'Medium', status: 'Pending', startDate: new Date('2026-05-05'), dueDate: new Date('2026-05-20'), createdAt: new Date('2026-04-20') },
    { id: '10', title: 'Code Review Session', description: 'Weekly team code review to ensure code quality standards.', assignedTo: 'Alice Wong', priority: 'Low', status: 'Pending', startDate: new Date('2026-04-22'), dueDate: new Date('2026-04-23'), createdAt: new Date('2026-04-21') }
  ];

  private activityLogs: Map<string, ActivityLog[]> = new Map();
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor(private loader: LoaderService) {
    this.initializeLogs();
  }

  private initializeLogs() {
    this.tasks.forEach(task => {
      this.activityLogs.set(task.id, [
        { id: Math.random().toString(36).substr(2, 9), taskId: task.id, message: 'Task created', user: 'System', timestamp: task.createdAt },
        { id: Math.random().toString(36).substr(2, 9), taskId: task.id, message: `Status set to ${task.status}`, user: 'System', timestamp: new Date(task.createdAt.getTime() + 3600000) }
      ]);
    });
  }

  getTasks(): Observable<Task[]> {
    this.loader.show();
    return this.tasksSubject.asObservable().pipe(
      delay(800),
      tap(() => this.loader.hide())
    );
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    this.loader.show();
    const id = Math.random().toString(36).substr(2, 9);
    const newTask: Task = {
      ...task,
      id,
      createdAt: new Date()
    };
    
    setTimeout(() => {
      this.tasks = [...this.tasks, newTask];
      this.tasksSubject.next(this.tasks);
      
      // Add Activity Log
      const logs = [
        { id: Math.random().toString(36).substr(2, 9), taskId: id, message: 'Task created', user: 'Current User', timestamp: new Date() }
      ];
      this.activityLogs.set(id, logs);
      
      this.loader.hide();
    }, 1000);
  }

  updateTask(task: Task): void {
    this.loader.show();
    setTimeout(() => {
      const oldTask = this.tasks.find(t => t.id === task.id);
      const updatedTask = {
        ...task,
        createdAt: task.createdAt || oldTask?.createdAt || new Date()
      };
      this.tasks = this.tasks.map(t => t.id === task.id ? updatedTask : t);
      this.tasksSubject.next(this.tasks);

      // Add Activity Log
      if (oldTask) {
        const logs = this.activityLogs.get(task.id) || [];
        if (oldTask.status !== task.status) {
          logs.unshift({ id: Math.random().toString(36).substr(2, 9), taskId: task.id, message: `Status changed from ${oldTask.status} to ${task.status}`, user: 'Current User', timestamp: new Date() });
        } else if (oldTask.priority !== task.priority) {
          logs.unshift({ id: Math.random().toString(36).substr(2, 9), taskId: task.id, message: `Priority changed from ${oldTask.priority} to ${task.priority}`, user: 'Current User', timestamp: new Date() });
        } else {
          logs.unshift({ id: Math.random().toString(36).substr(2, 9), taskId: task.id, message: 'Task details updated', user: 'Current User', timestamp: new Date() });
        }
        this.activityLogs.set(task.id, logs);
      }
      
      this.loader.hide();
    }, 1000);
  }

  deleteTask(id: string): void {
    this.loader.show();
    setTimeout(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.tasksSubject.next(this.tasks);
      this.activityLogs.delete(id);
      this.loader.hide();
    }, 800);
  }

  getActivityLogs(taskId: string): Observable<ActivityLog[]> {
    this.loader.show();
    const logs = this.activityLogs.get(taskId) || [];
    return of(logs).pipe(
      delay(500),
      tap(() => this.loader.hide())
    );
  }
}
