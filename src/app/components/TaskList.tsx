"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskListItem from "./TaskListItem";
import { Status } from "@/types";
import { useTasksContext } from "./TasksContext";

export default function TaskList({ title, id }: { title: string; id: Status }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const tasks = useTasksContext().tasks[id];

  const overClasses = isOver ? " text-accent-content bg-accent/20" : "";

  return (
    <div
      className={
        "border-containers rounded-containers min-h-[40vh] p-2" + overClasses
      }
      ref={setNodeRef}
    >
      <h3>{title}</h3>
      <ul className="space-y-2">
        {tasks &&
          tasks.map((task) => <TaskListItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
