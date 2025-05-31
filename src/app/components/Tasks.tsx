"use client";

import { TaskBoard } from "./TaskBoard";
import { Button, InputField } from "@barrelrolla/react-components-library";
import PlusIcon from "@/icons/icons";
import { useTasksContext } from "./TasksContext";

export default function Tasks() {
  const addTask = useTasksContext().addTask;
  return (
    <main>
      <form className="mb-8 flex -translate-x-5.5 items-end justify-center">
        <InputField
          labelClasses="text-center"
          placeholder="New task"
          name="task"
          id="task"
          className="pe-10"
        />
        <Button
          color="main"
          wrapperClasses="-mx-10 relative z-2 mb-[1px]"
          formAction={addTask}
          startIcon={<PlusIcon />}
          aria-label="add task"
        />
      </form>
      <div className="grid w-full grid-cols-3 gap-2 text-center">
        <TaskBoard />
      </div>
    </main>
  );
}
