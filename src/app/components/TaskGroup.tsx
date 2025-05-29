"use client";
import { updateTaskStatus } from "@/actions/task";
import DndContext from "./DndContext";
import TaskList from "./TaskList";
import { Task as TaskType } from "@/db/schemas/tasks";

export function TaskGroup({
  todoTasks,
  progressTasks,
  doneTasks,
}: {
  todoTasks: TaskType[];
  progressTasks: TaskType[];
  doneTasks: TaskType[];
}) {
  return (
    <DndContext
      onDragEnd={(event) => {
        if (event.over) {
          updateTaskStatus(
            event.active.id.toString(),
            event.over.id.toString(),
          );
        }
      }}
    >
      <TaskList id="todo" title="To Do" tasks={todoTasks} />
      <TaskList id="progress" title="In Progress" tasks={progressTasks} />
      <TaskList id="done" title="Completed" tasks={doneTasks} />
    </DndContext>
  );
}
