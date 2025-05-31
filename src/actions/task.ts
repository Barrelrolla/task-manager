"use server";

import { db } from "@/db";
import { tasks } from "@/db/schemas/tasks";
import { getUser } from "@/supabase/server";
import { Status, TasksByStatus } from "@/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllTasks() {
  const user = await getUser();
  if (!user) {
    return;
  }

  return await db.select().from(tasks).where(eq(tasks.userId, user.id));
}

export async function getTasksWithStatus(status: Status) {
  const user = await getUser();
  if (!user) {
    return;
  }

  return await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, user.id), eq(tasks.status, status)));
}

export async function getTasksByStatus(): Promise<TasksByStatus> {
  const user = await getUser();
  if (!user) {
    return {
      todo: [],
      progress: [],
      done: [],
    };
  }

  const values = await Promise.all([
    getTasksWithStatus("todo"),
    getTasksWithStatus("progress"),
    getTasksWithStatus("done"),
  ]);

  return {
    todo: values[0] || [],
    progress: values[1] || [],
    done: values[2] || [],
  };
}

export async function createTask(formData: FormData) {
  const user = await getUser();
  const task = formData.get("task") as string;
  if (!task || !user) {
    return;
  }

  await db.insert(tasks).values({ text: task, userId: user.id });
  revalidatePath("/");
}

export async function updateTaskStatusAction(id: string, newStatus: Status) {
  const user = await getUser();
  if (!user) {
    return;
  }

  await db
    .update(tasks)
    .set({ status: newStatus })
    .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)));

  revalidatePath("/");
}
