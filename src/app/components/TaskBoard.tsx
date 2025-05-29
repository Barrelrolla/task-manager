import { getAllTasks } from "@/actions/task";
import DndContext from "./DndContext";
import TaskList from "./TaskList";
import Task from "./Task";

export default async function TaskBoard() {
  const tasks = await getAllTasks();

  if (!tasks) {
    return <div>No tasks </div>;
  }

  return (
    <div className="grid w-full grid-cols-3 text-center">
      <DndContext>
        <TaskList title="To Do">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TaskList>
        <TaskList title="In Progress"></TaskList>
        <TaskList title="Completed"></TaskList>
      </DndContext>
    </div>
  );
}
