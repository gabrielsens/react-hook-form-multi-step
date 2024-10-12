import { sessionStorageKeys } from "@/lib/sessionStorageKeys";
import { safeSessionStorageItem } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  StepperFooter,
  StepperNextButton,
} from "../Stepper";
import { useStepperContext } from "../Stepper/useStepperContext";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { StepHeader } from "./StepHeader";

const schema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(1, "Infome a senha"),
});

type FormData = z.infer<typeof schema>;

export function AccountStep() {
  const initialData = safeSessionStorageItem<FormData>(
    sessionStorageKeys.STEP_PERSONAL
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    disabled: !!initialData,
    defaultValues: {
      email: initialData?.email ?? "",
      password: initialData?.password ?? "",
    },
  });

  const { nextStep } = useStepperContext();

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);

    if (!initialData) {
      sessionStorage.setItem(
        sessionStorageKeys.STEP_PERSONAL,
        JSON.stringify({
          ...data,
          password: "*".repeat(data.password.length),
        })
      );
      await new Promise((r) => setTimeout(r, 1000));
    }

    nextStep();
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      window.onbeforeunload = () => "";
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  return (
    <form onSubmit={handleSubmit}>
      <StepHeader
        title="Crie sua conta"
        description="Seus dados de acesso à plataforma"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...form.register("email")} autoComplete="email" />
          {form.formState.errors.email?.message && (
            <small className="text-destructive">
              {form.formState.errors.email?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password?.message && (
            <small className="text-destructive">
              {form.formState.errors.password?.message}
            </small>
          )}
        </div>
      </div>
      <StepperFooter>
        <StepperNextButton
          type="submit"
          preventDefault
          disabled={form.formState.isSubmitting}
        />
      </StepperFooter>
    </form>
  );
}
