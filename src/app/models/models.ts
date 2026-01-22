import { Observable } from "rxjs";

export interface Entity {
  name: string;
  fields: EntityField[];
  onSave?: (entity: any) => Observable<any>;
}

interface EntityField {
  key: string;
  label: string;
  value?: any;
  type: "string" | "textarea" | "date" | "number" | "select" | "check";
  disabled?: boolean;
}

export interface Column {
  key: string;
  label: string;
  type?: "date" | "select" | "status";
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Employee {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: string;
  projects: number[];
  tasks: number[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  employee?: number;
  project: number;
  startDate?: Date;
  endDate?: Date;
}

export interface ProjectFilters {
  projectId?: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface TaskFilters {
  taskId?: number;
  projectId?: number;
  status?: string;
  employee?: number;
  startDateFrom?: Date;
  startDateTo?: Date;
}

export interface EmployeeFilters {
  employeeId?: number;
  projectId?: number;
  status?: string;
  employee?: number;
  startDateFrom?: Date;
  startDateTo?: Date;
}
