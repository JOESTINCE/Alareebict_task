# Task Management System

**Live Demo:** [https://task.alareebict.jestus.in/#/tasks](https://task.alareebict.jestus.in/#/tasks)

## Overview
This is a professional, responsive Angular application developed as an interview assignment for managing tasks assigned to employees or teams. It was built with a strong focus on modern Angular architecture, code quality, reusability, and premium UI/UX principles.

## 🚀 Core Requirements Implemented

### 1. Task List Page
A comprehensive data table displaying all tasks with the following features:
- **Data Columns:** Task Title, Assigned To, Priority (High/Medium/Low), Status (Pending/In Progress/Completed), Due Date, and Created Date.
- **Search & Filter:** Real-time search by task title/description and filtering by assignee and status.
- **Sorting & Pagination:** Fully functional sorting on columns and pagination to handle large datasets.
- **Responsive UI:** The table transforms into a clean, card-based layout on mobile and tablet devices for optimal viewing.

### 2. Add / Edit Task Form
A dedicated form interface for creating and editing tasks utilizing Angular Reactive Forms.
- **Fields:** Task Title, Description, Assigned To, Priority, Status, Start Date, and Due Date.
- **Validation:** Comprehensive validation rules including required fields and maximum character limits.
- **Custom Cross-Field Validation:** Custom validator ensuring that the *Due Date* cannot be before the *Start Date*.
- **Error Handling:** Real-time visual feedback and error messages displayed upon interaction or when limits are exceeded.

### 3. Task Details Page
A dedicated view for individual tasks:
- Displays full task information and assigned user details.
- Includes an Activity History timeline showing mocked data of task lifecycle events.

### 4. Reusable Components
The application is built using a highly modular component architecture. Reusable components include:
- **Shared Data Table (`<app-data-table>`):** A highly configurable, generic data table component that handles sorting, pagination, and responsive mobile-card rendering.
- **Confirmation Dialog (`<app-confirm-dialog>`):** A generic, theme-matched dialog used for delete confirmations and unsaved changes warnings.
- **Status Badge (`<app-status-badge>`):** A reusable chip component that dynamically styles itself based on task status and priority.
- **Form Field Component (`<app-form-field>`):** A wrapper component that standardizes input styling, validation hints, and error message rendering across the app.

---

## 🏆 Evaluation Criteria & Implementation Details

### Angular Architecture & Code Quality
- **Standalone Components:** Built using the modern Angular 17+ Standalone Components API, eliminating the need for `NgModules`.
- **Service Layer:** Data logic is abstracted into a singleton `TaskService`.
- **Strong Typing:** Comprehensive use of TypeScript interfaces for models (`Task`, `ActivityLog`, `TableColumn`).

### Validation & Error Handling
- Utilizes `ReactiveFormsModule` for robust, synchronous form validation.
- Global error handling implemented via RxJS `.subscribe({ error: (err) => ... })` blocks and a reusable `NotificationService` (Snackbars) to provide immediate user feedback in case of failures.

### Performance Optimization & Real-World Thinking
- **Mocked Backend Delay:** Artificial delays are applied via RxJS operators to simulate real-world API latency, complete with a global loading indicator.
- **Optimized Rendering:** UI updates instantly upon successful data mutation without waiting for artificial fetch delays.
- **Data Mutability:** State is managed immutably to prevent side-effects.

### UI/UX Quality
- Built with Angular Material, heavily customized to achieve a premium, modern, and accessible design system (gradients, soft shadows, rounded corners, clean typography).
- Micro-interactions (hover states, active link highlighting, smooth transitions) are applied throughout to enhance the user experience.

---

## ⭐ Bonus Requirements Achieved

- **Route Guards:** Implemented a `CanDeactivate` guard (`dirtyFormGuard`) to prevent users from accidentally navigating away from the task form with unsaved changes.
- **Lazy Loading:** Routes are configured with `loadComponent` to split bundles and improve initial load times.
- **RxJS Best Practices:** Extensive use of `BehaviorSubject`, `Observable`, and pipeable operators (`map`, `filter`, `tap`, `shareReplay`) for reactive state management.
- **Responsive Design Optimization:** Used `@angular/cdk/layout` (`BreakpointObserver`) combined with CSS media queries to dynamically adjust layouts (e.g., swapping the sidebar to an overlay, switching tables to card lists) across Desktop, iPad, and Mobile viewports.

---

## 🛠️ Tech Stack
- **Framework:** Angular 18
- **UI Component Library:** Angular Material
- **Styling:** SCSS (Custom Material 3 Theming)
- **State Management:** RxJS

## 🚦 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/`.
