import { cn } from "@/lib/utils";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useState
} from "react";
import { Button } from "../ui/Button";
import { useStepperContext } from "./useStepperContext";

interface IStepperContext {
  nextStep: () => void;
  previousStep: () => void;
}

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
}

export const StepperContext = createContext({} as IStepperContext);
StepperContext.displayName = "Stepper";

export function Stepper({ steps, initialStep }: IStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(steps.length - 1, (prev += 1)));
  }, [steps.length]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, (prev -= 1)));
  }, []);

  return (
    <StepperContext.Provider
      value={{
        nextStep,
        previousStep,
      }}
    >
      <div>
        <ul className="space-x-6">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                "inline-block text-xs",
                index === currentStep &&
                  "bg-primary text-primary-foreground px-2 py-1 rounded-md"
              )}
            >
              {String(index + 1).padStart(2, "0")}. {step.label}
            </li>
          ))}
        </ul>
        <div className="mt-10">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: PropsWithChildren) {
  return <footer className="flex gap-2 justify-end mt-6">{children}</footer>;
}

export function StepperPreviousButton({
  size = "sm",
  type = "button",
  variant = "secondary",
  preventDefault,
  onClick,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Button> & {
  preventDefault?: boolean
}) {
  const { previousStep } = useStepperContext();

  const previousStepHandler = !preventDefault ? previousStep : undefined;

  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      onClick={onClick ?? previousStepHandler}
      {...rest}
    >
      Anterior
    </Button>
  );
}

export function StepperNextButton({
  size = "sm",
  type = "button",
  preventDefault,
  onClick,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Button> & {
  preventDefault?: boolean
}) {
  const { nextStep } = useStepperContext();

  const nextStepHandler = !preventDefault ? nextStep : undefined;

  return (
    <Button type={type} size={size} onClick={onClick ?? nextStepHandler} {...rest}>
      Próximo
    </Button>
  );
}
