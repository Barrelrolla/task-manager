import { getUser } from "@/supabase/server";
import {
  Button,
  Hero,
  HeroActions,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import Link from "next/link";
import Tasks from "./components/Tasks";
import { TasksContextProvider } from "./components/TasksContext";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    return (
      <Hero textAlign="center">
        <HeroSection>
          <HeroTitle>Task Manager</HeroTitle>
          <HeroText>Login to track your tasks</HeroText>
          <HeroActions>
            <Button color="main" variant="outline" as={Link} href="/login">
              Login
            </Button>
          </HeroActions>
        </HeroSection>
      </Hero>
    );
  }

  return (
    <TasksContextProvider>
      <Tasks />
    </TasksContextProvider>
  );
}
