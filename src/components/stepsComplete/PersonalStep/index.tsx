import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "@/components/Stepper";
import { useStepperContext } from "@/components/Stepper/useStepperContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { FormData } from "../index";

export function PersonalStep() {
  const { nextStep } = useStepperContext();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("personalStep");

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Dados pessoais"
        description="Conte-nos mais sobre você"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...form.register("personalStep.firstName")} />
          {form.formState.errors.personalStep?.firstName?.message && (
            <small className="text-destructive">
              {form.formState.errors.personalStep?.firstName?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...form.register("personalStep.lastName")} />
          {form.formState.errors.personalStep?.lastName?.message && (
            <small className="text-destructive">
              {form.formState.errors.personalStep?.lastName?.message}
            </small>
          )}
        </div>
      </div>
      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
