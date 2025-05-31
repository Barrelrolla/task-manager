"use client";
import {
  createTask,
  getTasksByStatus,
  updateTaskStatusAction,
} from "@/actions/task";
import { Task } from "@/db/schemas/tasks";
import { Status, TasksByStatus } from "@/types";
import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from "react";

export type TasksContextProps = {
  tasks: TasksByStatus;
  updateTaskStatus: (task: Task, newStatus: Status) => void;
  addTask: (formData: FormData) => void;
};

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export function TasksContextProvider({ children }: PropsWithChildren) {
  const [tasksState, setTasksState] = useState<TasksByStatus>({
    todo: [],
    progress: [],
    done: [],
  });
  const [optimisticTasks, setOptimisticTasks] =
    useOptimistic<TasksByStatus>(tasksState);

  const refreshTasks = useCallback(
    async (setOptimistic: boolean = false) => {
      const tasks = await getTasksByStatus();
      setTasksState(tasks);
      if (setOptimistic) {
        startTransition(() => {
          setOptimisticTasks(tasks);
        });
      }
    },
    [setOptimisticTasks],
  );

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  async function addTask(formData: FormData) {
    const text = formData.get("task") as string;
    startTransition(() => {
      setOptimisticTasks((prevTasks) => ({
        ...prevTasks,
        todo: [
          ...prevTasks.todo,
          { id: text, status: "todo", text: text, userId: "" },
        ],
      }));
    });

    await createTask(formData);
    refreshTasks(true);
  }

  async function updateTaskStatus(task: Task, newStatus: Status) {
    if (task.status === newStatus) {
      return;
    }

    startTransition(() => {
      setOptimisticTasks((prevTasks) => {
        const newTasks: TasksByStatus = {
          todo: prevTasks.todo.filter((t) => t.id !== task.id),
          progress: prevTasks.progress.filter((t) => t.id !== task.id),
          done: prevTasks.done.filter((t) => t.id !== task.id),
        };
        newTasks[newStatus] = [
          ...newTasks[newStatus],
          {
            ...task,
            status: newStatus,
          },
        ];
        return newTasks;
      });
    });
    await updateTaskStatusAction(task.id, newStatus);
    refreshTasks();
  }

  return (
    <TasksContext.Provider
      value={{ tasks: optimisticTasks, updateTaskStatus, addTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("You need to proide a Tasks Context");
  }

  return context;
}
