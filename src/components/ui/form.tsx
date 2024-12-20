// src/components/ui/form.tsx
"use client";

import * as React from "react";
import {
  FormProvider,
  useFormContext,
  Controller,
  FieldValues,
  FieldPath,
  ControllerProps
} from "react-hook-form";
import { cn } from "~/lib/utils";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: { name: TName } & ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

const FormItem = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className="space-y-1" {...props}>
      {children}
    </div>
  );
  
  const FormLabel = ({ ...props }) => {
    const { error } = useFormField();
    return (
      <label
        className={cn(
          "block text-sm font-medium text-gray-700",
          error && "text-red-500"
        )}
        {...props}
      />
    );
  };
  
  const FormControl = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const { error } = useFormField();
  return (
    <input
      ref={ref}
      className={cn(
        "block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        error && "ring-red-500"
      )}
      {...props}
    />
  );
});

const Button = ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="w-full rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
    {...props}
  >
    {children}
  </button>
);
Button.displayName = 'Button';

export { useFormField, Form, FormItem, FormLabel, FormControl, FormField,Button };