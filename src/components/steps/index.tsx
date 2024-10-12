import { Stepper } from "../Stepper";
import { AccountStep } from "./AccountStep";
import { AddressStep } from "./AddressStep";
import { PersonalStep } from "./PersonalStep";

export function Step() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Step Unitário
      </h1>
      <Stepper
        steps={[
          { label: "Conta", content: <AccountStep /> },
          { label: "Dados pessoais", content: <PersonalStep /> },
          { label: "Endereço", content: <AddressStep /> },
        ]}
      />
    </>
  );
}
