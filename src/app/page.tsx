import { createTask } from "@/actions/task";
import { getUser } from "@/supabase/server";
import {
  Button,
  Hero,
  HeroActions,
  HeroSection,
  HeroText,
  HeroTitle,
  InputField,
} from "@barrelrolla/react-components-library";
import Link from "next/link";
import PlusIcon from "@/icons/icons";
import TaskBoard from "./components/TaskBoard";
import { Suspense } from "react";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    return (
      <Hero textAlign="center">
        <HeroSection>
          <HeroTitle>Task Manager</HeroTitle>
          <HeroText>Login to track your tasks</HeroText>
          <HeroActions>
            <Button as={Link} href="/login">
              Login
            </Button>
          </HeroActions>
        </HeroSection>
      </Hero>
    );
  }

  return (
    <>
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
          formAction={createTask}
          startIcon={<PlusIcon />}
          aria-label="add task"
        />
      </form>
      <Suspense>
        <TaskBoard />
      </Suspense>
    </>
  );
}
