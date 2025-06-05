"use client";

import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import DndContext from "./DndContext";
import TaskList from "./TaskList";
import { Status } from "@/types";
import { useTasksContext } from "./TasksContext";
import { Task } from "@/db/schemas/tasks";
import { Button, InputField } from "@barrelrolla/react-components-library";
import { PlusIcon } from "@/icons/icons";
import DeleteTask from "./DeleteTask";

export function TaskBoard() {
  const { updateTaskStatus, addTask, deleteTask } = useTasksContext();

  return (
    <DndContext
      onDragEnd={(event) => {
        if (event.over) {
          const overName = event.over.id.toString();
          const task = event.active.data.current as Task;

          if (overName === "trash") {
            deleteTask(task.id);
          } else {
            updateTaskStatus(task, overName as Status);
          }
        }
      }}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="mb-8 flex justify-evenly">
        <form className="flex items-end justify-center">
          <InputField
            labelClasses="text-center"
            placeholder="New task"
            name="task"
            id="task"
            className="pe-10"
            required
          />
          <Button
            color="main"
            wrapperClasses="-mx-10 relative z-2 mb-[1px]"
            formAction={addTask}
            startIcon={<PlusIcon />}
            aria-label="add task"
          />
        </form>
        <DeleteTask />
      </div>
      <div className="grid w-full grid-cols-3 gap-2 text-center">
        <TaskList id="todo" title="To Do" />
        <TaskList id="progress" title="In Progress" />
        <TaskList id="done" title="Completed" />
      </div>
    </DndContext>
  );
}
