export interface Entity {
  name: string;
  fields: EntityField[];
}

interface EntityField {
  key: string;
  label: string;
  value?: any;
  type: "string" | "textarea" | "date" | "number" | "select" | "check";
}

export interface Column {
  name: string;
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
  status: number;
  employee?: number;
  project: number;
  startDate?: Date;
  endDate?: Date;
}
