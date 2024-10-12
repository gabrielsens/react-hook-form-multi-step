import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Stepper } from "../Stepper";
import { AccountStep } from "./AccountStep";
import { accountStepSchema } from "./AccountStep/schema";
import { AddressStep } from "./AddressStep";
import { addresStepSchema } from "./AddressStep/schema";
import { PersonalStep } from "./PersonalStep";
import { personalStepSchema } from "./PersonalStep/schema";

const schema = z.object({
  accountStep: accountStepSchema,
  addressStep: addresStepSchema,
  personalStep: personalStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function StepComplete() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountStep: {
        email: "",
        password: "",
      },
      addressStep: {
        city: "",
        state: "",
        street: "",
      },
      personalStep: {
        firstName: "",
        lastName: "",
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);

    await new Promise(r => setTimeout(r, 1000));
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold tracking-tight mt-16 mb-2">
          Step Completo
        </h1>
        <Stepper
          steps={[
            { label: "Conta", content: <AccountStep /> },
            { label: "Dados pessoais", content: <PersonalStep /> },
            { label: "Endereço", content: <AddressStep /> },
          ]}
        />
      </form>
    </FormProvider>
  );
}
