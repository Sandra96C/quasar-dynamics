import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { authGuard } from "./guards/auth.guard";
import { EmployeesComponent } from "./pages/employees/employees.component";
import { TasksComponent } from "./pages/tasks/tasks.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { guestGuard } from "./guards/guest.guard";
import { HomeComponent } from "./pages/home/home.component";
import { ProjectDetailComponent } from "./pages/project-detail/project-detail.component";
import { TaskDetailComponent } from "./pages/task-detail/task-detail.component";
import { EmployeeDetailComponent } from "./pages/employee-detail/employee-detail.component";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "projects/:id", component: ProjectDetailComponent },
      { path: "tasks", component: TasksComponent },
      { path: "tasks/:id", component: TaskDetailComponent },
      { path: "employees", component: EmployeesComponent },
      { path: "employees/:id", component: EmployeeDetailComponent },
    ],
  },
  { path: "login", component: LoginComponent, canActivate: [guestGuard] },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "404" },
];
