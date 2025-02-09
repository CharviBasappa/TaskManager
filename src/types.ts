export type Task = {
    id: number;
    title: string;
    completed: boolean;
    dueDate?: string;  // Optional due date
    priority: "High" | "Medium" | "Low";  // Task priority
  };