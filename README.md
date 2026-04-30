# TaskFlow Pro – Task Management System

A professional, responsive Angular 18 application built with Angular Material for managing team tasks.

## 🚀 Features

- **Dynamic Task Dashboard**: Real-time search, multi-filter (Assignee & Status), and sorting.
- **Advanced Data Table**: Reusable component with pagination and custom templates.
- **Robust Forms**: Reactive forms with complex validation (e.g., Due Date logic).
- **Task Details & History**: Comprehensive view of task progress and activity logs.
- **Modern UI**: Bright, clean Material Design 3 theme.
- **Lazy Loading**: Optimized bundle sizes with feature-based routing.
- **Route Guards**: Secure route access for task management.

## 🛠️ Tech Stack

- **Framework**: Angular 18 (Standalone Components)
- **UI Library**: Angular Material
- **Icons**: Material Icons
- **State Management**: RxJS (BehaviorSubjects & Observables)
- **Styling**: SCSS with Material 3 Theme

## 📂 Project Structure

```
src/app/
├── core/               # Singleton services, models, and guards
│   ├── guards/         # Auth and Route guards
│   ├── models/         # TypeScript Interfaces
│   └── services/       # Task data management
├── shared/             # Reusable components
│   └── components/     # DataTable, StatusBadge, ConfirmDialog
└── features/           # Lazy-loaded feature modules
    └── tasks/          # Task List, Form, and Details pages
```

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the application**:
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/`.

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🧪 Requirements Satisfied

- [x] **Task List Page**: Title, Assignee, Priority, Status, Due Date, Created Date.
- [x] **Search & Filters**: Search by title, filter by assignee/status.
- [x] **Sorting & Pagination**: Fully functional Material table implementation.
- [x] **Add/Edit Form**: Separate page with reactive validation and error handling.
- [x] **Date Validation**: Logic ensuring Due Date is after Start Date.
- [x] **Task Details**: Activity history and user info integration.
- [x] **Reusable Components**: Shared Table, Confirm Dialog, and Status Badge.
- [x] **Bonus**: Route Guards, Lazy Loading, RxJS patterns, and Responsive Design.

---
*Developed as a professional technical assignment.*
