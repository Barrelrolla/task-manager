"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseAuth } from "@/supabase/server";

export async function login(prevState: string | undefined, formData: FormData) {
  const auth = await getSupabaseAuth();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await auth.signInWithPassword(data);
    if (error) {
      return error.code?.toString();
    }
  } catch (error) {
    return error as string;
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(
  prevState: string | undefined,
  formData: FormData,
) {
  const auth = await getSupabaseAuth();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await auth.signInWithPassword(data);
    if (error) {
      return error.code?.toString();
    }
  } catch (error) {
    return error as string;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const auth = await getSupabaseAuth();

  const { error } = await auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
