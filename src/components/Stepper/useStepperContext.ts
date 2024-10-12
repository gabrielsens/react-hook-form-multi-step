import { useContext } from "react";
import { StepperContext } from ".";

export function useStepperContext() {
  const context = useContext(StepperContext);

  if (context == null) throw new Error('StepperContext is not defined')
  return context;
}