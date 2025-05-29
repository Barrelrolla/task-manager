"use server";

import { db } from "@/db";
import { tasks } from "@/db/schemas/tasks";
import { getUser } from "@/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllTasks() {
  const user = await getUser();
  if (!user) {
    return;
  }

  return await db.select().from(tasks).where(eq(tasks.userId, user.id));
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
