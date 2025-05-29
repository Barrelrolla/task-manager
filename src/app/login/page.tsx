import { login } from "@/actions/user";
import {
  Anchor,
  Button,
  Card,
  CardTitle,
  InputField,
} from "@barrelrolla/react-components-library";

export default function LoginPage() {
  return (
    <Card containerClasses="mx-auto mt-40">
      <CardTitle>Log in</CardTitle>
      <form className="mx-auto flex w-fit flex-col gap-2">
        <InputField
          className="w-full"
          type="email"
          id="email"
          name="email"
          label="Email"
          required
        />
        <InputField
          type="password"
          id="password"
          name="password"
          label="Password"
          required
        />
        <div className="my-4 flex flex-col">
          <Button
            as="button"
            color="main"
            className="w-full"
            formAction={login}
          >
            Log in
          </Button>
          <span className="text-center">
            Not registered?{" "}
            <Anchor color="main" className="w-fit" href="/signup">
              Sign up
            </Anchor>
          </span>
        </div>
      </form>
    </Card>
  );
}
