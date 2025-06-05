"use client";
import { login, signup } from "@/actions/user";
import {
  Anchor,
  Button,
  Card,
  CardTitle,
  InputField,
} from "@barrelrolla/react-components-library";
import { usePathname } from "next/navigation";
import { useActionState } from "react";

export default function Authenticate() {
  const signin = usePathname().startsWith("/signup");
  const [error, loginAction, isPending] = useActionState(
    signin ? signup : login,
    undefined,
  );

  const buttonLabel = signin
    ? "Sign up"
    : isPending
      ? "Logging in..."
      : "Log in";
  return (
    <Card containerClasses="mx-auto mt-40">
      <CardTitle>Log in</CardTitle>
      <form action={loginAction} className="mx-auto flex w-fit flex-col gap-2">
        <InputField
          color={error ? "error" : "main"}
          className="w-full"
          type="email"
          id="email"
          name="email"
          label="Email"
          required
          disabled={isPending}
        />
        <InputField
          color={error ? "error" : "main"}
          type="password"
          id="password"
          name="password"
          label="Password"
          error={error?.toString()}
          required
          disabled={isPending}
        />
        {signin && (
          <InputField
            color={error ? "error" : "main"}
            type="password"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            error={error?.toString()}
            required
            disabled={isPending}
          />
        )}
        <div className="my-4 flex flex-col">
          <Button
            as="button"
            color="main"
            className="w-full"
            loading={isPending}
          >
            {buttonLabel}
          </Button>
          {!signin && (
            <span className="text-center">
              Not registered?{" "}
              <Anchor color="main" className="w-fit" href="/signup">
                Sign up
              </Anchor>
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}
