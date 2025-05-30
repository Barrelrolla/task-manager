"use client";

import { Task as TaskType } from "@/db/schemas/tasks";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

export default function TaskList({
  title,
  id,
  tasks,
}: {
  title: string;
  id: string;
  tasks: TaskType[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    data: { title: title },
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{title}</h3>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
