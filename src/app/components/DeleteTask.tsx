"use client";

import { useDroppable } from "@dnd-kit/core";
import { ThrashIcon } from "@/icons/icons";

export default function DeleteTask() {
  const { isOver, setNodeRef } = useDroppable({
    id: "trash",
  });

  const overClasses = isOver ? "bg-error/80" : "";

  return (
    <div
      className={
        "border-containers rounded-containers bg-error/40 text-error-content flex aspect-square h-10 items-center justify-center p-2 text-xl" +
        overClasses
      }
      ref={setNodeRef}
    >
      <ThrashIcon />
    </div>
  );
}
