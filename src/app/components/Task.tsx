"use client";

import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardInteract,
  CardText,
  ColorType,
} from "@barrelrolla/react-components-library";
import { Task as TaskType } from "@/db/schemas/tasks";

export default function Task({ task }: { task: TaskType }) {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable(
    {
      id: task.id,
    },
  );
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : { touchAction: "none" };

  const classes = "relative" + (active?.id === task.id ? " z-15" : "");
  const colorMap: { [x: string]: ColorType } = {
    todo: "info",
    progress: "warning",
    done: "success",
  };

  return (
    <div
      className={classes}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Card
        containerClasses="justify-self-center hover:cursor-grab active:cursor-grabbing"
        color={colorMap[task.status]}
      >
        <CardInteract>
          <CardText>{task.text}</CardText>
        </CardInteract>
      </Card>
    </div>
  );
}
