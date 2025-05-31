"use client";

import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import DndContext from "./DndContext";
import TaskList from "./TaskList";
import { Status } from "@/types";
import { useTasksContext } from "./TasksContext";
import { Task } from "@/db/schemas/tasks";

export function TaskBoard() {
  const { updateTaskStatus } = useTasksContext();

  return (
    <DndContext
      onDragEnd={(event) => {
        if (event.over) {
          const overName = event.over.id.toString() as Status;
          updateTaskStatus(event.active.data.current as Task, overName);
        }
      }}
      modifiers={[restrictToWindowEdges]}
    >
      <TaskList id="todo" title="To Do" />
      <TaskList id="progress" title="In Progress" />
      <TaskList id="done" title="Completed" />
    </DndContext>
  );
}
