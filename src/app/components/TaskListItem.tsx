"use client";

import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardInteract,
  CardText,
  ColorType,
} from "@barrelrolla/react-components-library";
import { Task } from "@/db/schemas/tasks";
import { Status } from "@/types";

export default function TaskLIstItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable(
    {
      id: task.id,
      data: task,
    },
  );
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : { touchAction: "none" };

  const classes = "relative" + (active?.id === task.id ? " z-15" : "");
  const colorMap: Record<Status, ColorType> = {
    todo: "info",
    progress: "secondary",
    done: "success",
  };

  return (
    <li
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
          <CardText className="px-1 py-1 sm:px-2 sm:py-2">{task.text}</CardText>
        </CardInteract>
      </Card>
    </li>
  );
}
