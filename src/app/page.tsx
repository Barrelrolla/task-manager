import { getUser } from "@/supabase/server";
import { TasksContextProvider } from "./components/TasksContext";
import { TaskBoard } from "./components/TaskBoard";

export default async function HomePage() {
  const user = await getUser();

  return (
    <TasksContextProvider user={user}>
      <TaskBoard />
    </TasksContextProvider>
  );
}
