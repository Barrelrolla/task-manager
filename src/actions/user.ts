"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseAuth } from "@/supabase/server";

export async function login(prevState: void, formData: FormData) {
  const auth = await getSupabaseAuth();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const auth = await getSupabaseAuth();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await auth.signUp(data);

  if (error) {
    redirect("/error");
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
