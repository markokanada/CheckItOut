interface Task {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  priority: number;
  status: [            "new",
    "in-progress",
    "finished",
    "expired"]
  category_id: number;
  user_id: number | object;
}
