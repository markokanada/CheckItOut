import { TaskStatus } from "./TaskStatus";

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  priority: number;
  status: TaskStatus,
  category_id: number;
  user_id: number;
}
