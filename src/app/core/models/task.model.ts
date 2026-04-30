export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: Date;
  dueDate: Date;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  taskId: string;
  message: string;
  timestamp: Date;
  user: string;
}
