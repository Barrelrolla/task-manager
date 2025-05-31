import { Task } from "./db/schemas/tasks";

export type Status = "todo" | "progress" | "done";
export type TasksByStatus = Record<Status, Task[]>;
