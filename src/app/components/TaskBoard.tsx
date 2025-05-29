import { getTasksByStatus } from "@/actions/task";
import { TaskGroup } from "./TaskGroup";

export default async function TaskBoard() {
  const tasks = await getTasksByStatus();
  if (!tasks) {
    return <div>No tasks</div>;
  }

  const { todo, progress, done } = tasks;

  return (
    <div className="grid w-full grid-cols-3 text-center">
      <TaskGroup
        todoTasks={todo!}
        progressTasks={progress!}
        doneTasks={done!}
      />
    </div>
  );
}
