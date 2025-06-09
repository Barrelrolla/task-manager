"use client";
import {
  createTask,
  deleteTaskAction,
  getTasksByStatus,
  updateTaskStatusAction,
} from "@/actions/task";
import { Task } from "@/db/schemas/tasks";
import { Status, TasksByStatus } from "@/types";
import { User } from "@supabase/supabase-js";
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
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export function TasksContextProvider({
  user,
  children,
}: { user: User | null } & PropsWithChildren) {
  const [tasksState, setTasksState] = useState<TasksByStatus>({
    todo: [],
    progress: [],
    done: [],
  });
  const [optimisticTasks, setOptimisticTasks] =
    useOptimistic<TasksByStatus>(tasksState);

  const refreshTasks = useCallback(
    async (setOptimistic: boolean = false) => {
      let tasks: TasksByStatus;

      function timeout() {
        return new Promise((resolve) => setTimeout(resolve, 0));
      }

      if (!user) {
        await timeout();
        tasks = JSON.parse(localStorage.getItem("tasks") || "");
      } else {
        tasks = await getTasksByStatus();
      }

      setTasksState(tasks);
      if (setOptimistic) {
        startTransition(() => {
          setOptimisticTasks(tasks);
        });
      }
    },
    [user, setOptimisticTasks],
  );

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  async function addTask(formData: FormData) {
    const text = formData.get("task") as string;
    const taskToAdd: Task = {
      id: text,
      status: "todo",
      text: text,
      userId: "",
    };

    startTransition(() => {
      setOptimisticTasks((prevTasks) => {
        const newTasks = {
          ...prevTasks,
          todo: [...prevTasks.todo, taskToAdd],
        };

        if (!user) {
          localStorage.setItem("tasks", JSON.stringify(newTasks));
        }

        return newTasks;
      });
    });

    if (user) {
      await createTask(formData);
    }

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

        if (!user) {
          localStorage.setItem("tasks", JSON.stringify(newTasks));
        }

        return newTasks;
      });
    });

    if (user) {
      await updateTaskStatusAction(task.id, newStatus);
    }
    refreshTasks();
  }

  async function deleteTask(id: string) {
    startTransition(() => {
      setOptimisticTasks((prevTasks) => {
        const newTasks = {
          todo: prevTasks.todo.filter((task) => task.id !== id),
          progress: prevTasks.progress.filter((task) => task.id !== id),
          done: prevTasks.done.filter((task) => task.id !== id),
        };

        if (!user) {
          localStorage.setItem("tasks", JSON.stringify(newTasks));
        }

        return newTasks;
      });
    });

    if (user) {
      await deleteTaskAction(id);
    }
    refreshTasks();
  }

  return (
    <TasksContext.Provider
      value={{ tasks: optimisticTasks, updateTaskStatus, addTask, deleteTask }}
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
