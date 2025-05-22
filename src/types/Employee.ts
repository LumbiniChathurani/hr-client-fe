export interface Employee {
  id: number;
  userName: string;
  email: string;
  password?: string; // optional for editing
  userRole: string;
  department: string;
}
