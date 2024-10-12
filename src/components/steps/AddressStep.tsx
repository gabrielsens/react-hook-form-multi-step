import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepperFooter, StepperPreviousButton } from "../Stepper";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { StepHeader } from "./StepHeader";

const schema = z.object({
  state: z.string().min(1, "Informe um estado"),
  street: z.string().min(1, "Infome uma rua"),
  city: z.string().min(1, "Infome a cidade"),
});

type FormData = z.infer<typeof schema>;

export function AddressStep() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: '',
      state: '',
      street: ''
    }
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);

    await new Promise((r) => setTimeout(r, 1000));
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
      <StepHeader title="Endereço" description="De onde você é?" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" {...form.register("state")} />
          {form.formState.errors.state?.message && (
            <small className="text-destructive">
              {form.formState.errors.state?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...form.register("city")} />
          {form.formState.errors.city?.message && (
            <small className="text-destructive">
              {form.formState.errors.city?.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input id="street" {...form.register("street")} />
          {form.formState.errors.street?.message && (
            <small className="text-destructive">
              {form.formState.errors.street?.message}
            </small>
          )}
        </div>
      </div>
      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <Button size="sm" disabled={form.formState.isSubmitting}>
          Finalizar
        </Button>
      </StepperFooter>
    </form>
  );
}
