import React from "react";

type SubmitFnContextType = {
  onSubmit: () => void;
};

const FormSubmitFnContext = React.createContext<SubmitFnContextType | null>(null);

// Custom hook to access the context
export function useFormSubmitFn() {
  return React.use(FormSubmitFnContext);
}

// Provider component
export function FormSubmitFnProvider({
                                       onSubmit,
                                       children,
                                     }: React.PropsWithChildren<SubmitFnContextType>) {
  return (
    <FormSubmitFnContext.Provider value={{ onSubmit }}>
      {children}
    </FormSubmitFnContext.Provider>
  );
}
