import { Step } from "./components/steps";
import { StepComplete } from "./components/stepsComplete";


export function App() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-20">
      <Step />
      <StepComplete />
    </div>
  );
}
