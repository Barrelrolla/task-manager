import { signup } from "@/actions/user";
import {
  Button,
  Card,
  CardTitle,
  InputField,
} from "@barrelrolla/react-components-library";

export default function CreateAccountPage() {
  return (
    <Card containerClasses="mx-auto mt-40">
      <CardTitle>Sign up</CardTitle>
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
        <InputField
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          required
        />
        <div className="my-4 flex flex-col">
          <Button as="button" className="w-full" formAction={signup}>
            Sign up
          </Button>
        </div>
      </form>
    </Card>
  );
}
