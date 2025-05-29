"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card, CardTitle } from "@barrelrolla/react-components-library";
import { Task as TaskType } from "@/db/schemas/tasks";

export default function Task({ task }: { task: TaskType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card containerClasses="hover:cursor-grab active:cursor-grabbing">
        <CardTitle>{task.text}</CardTitle>
      </Card>
    </div>
  );
}
