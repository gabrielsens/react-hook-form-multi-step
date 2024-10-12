import { StepperFooter, StepperNextButton } from "@/components/Stepper";
import { useStepperContext } from "@/components/Stepper/useStepperContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { FormData } from "../index";
import { StepHeader } from "../StepHeader";

export function AccountStep() {
  const { nextStep } = useStepperContext();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("accountStep");

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Crie sua conta"
        description="Seus dados de acesso à plataforma"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...form.register("accountStep.email")} />
          {form.formState.errors.accountStep?.email?.message && (
            <small className="text-destructive">
              {form.formState.errors.accountStep?.email?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            {...form.register("accountStep.password")}
          />
          {form.formState.errors.accountStep?.password?.message && (
            <small className="text-destructive">
              {form.formState.errors.accountStep?.password?.message}
            </small>
          )}
        </div>
      </div>
      <StepperFooter>
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
