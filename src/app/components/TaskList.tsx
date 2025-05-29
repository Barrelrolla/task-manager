"use client";

import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export default function TaskList({
  title,
  children,
}: { title: string } & PropsWithChildren) {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
