import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../Stepper";
import { useStepperContext } from "../Stepper/useStepperContext";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { StepHeader } from "./StepHeader";

const schema = z.object({
  firstName: z.string().min(1, "Informe um nome"),
  lastName: z.string().min(1, "Infome um sobrenome"),
});

type FormData = z.infer<typeof schema>;

export function PersonalStep() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const { nextStep } = useStepperContext();

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);

    await new Promise((r) => setTimeout(r, 1000));

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
        title="Dados pessoais"
        description="Conte-nos mais sobre você"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...form.register("firstName")} />
          {form.formState.errors.firstName?.message && (
            <small className="text-destructive">
              {form.formState.errors.firstName?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...form.register("lastName")} />
          {form.formState.errors.lastName?.message && (
            <small className="text-destructive">
              {form.formState.errors.lastName?.message}
            </small>
          )}
        </div>
      </div>
      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <StepperNextButton
          type="submit"
          preventDefault
          disabled={form.formState.isSubmitting}
        />
      </StepperFooter>
    </form>
  );
}
