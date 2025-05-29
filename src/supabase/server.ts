import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getUser() {
  const auth = getSupabaseAuth();
  const user = (await (await auth).getUser()).data.user;

  return user;
}

export async function getSupabaseAuth() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  ).auth;
}
