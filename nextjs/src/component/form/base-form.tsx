"use client"
import React from "react";
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormReturn
} from "react-hook-form";
import {errorLog} from "@log";
import Grid from "@mui/material/Grid2";
import {FormSubmitFnProvider} from "~/component/form/hooks/use-form-submit";
import FormControlButtons from "~/component/form/form-control-buttons";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {useRouter} from 'next/navigation'
import toast from "react-hot-toast";


type MutationHookReturn<T> = {
  mutateAsync: (data: T) => Promise<unknown>,
  error: any
}

interface FormChildProps<IFormValues extends FieldValues> {
  methods: UseFormReturn<IFormValues>;
}

interface Props<T extends FieldValues> {
  initialValues: DefaultValues<T> | null
  afterSubmit?: () => void
  onCancel?: () => void
  returnPath?: string
  invalidateList?: () => Promise<void>;
  invalidateById?: (props: { id: string}) => Promise<void>;
  validationResolver: Resolver<T>
  mutationHook: (props: { onSuccess?: () => void }) => MutationHookReturn<T>
  children: (props: FormChildProps<T>) => React.ReactNode;
}

function BaseForm<T extends FieldValues>(props: Props<T>) {
  const methods = useForm<T>({
    defaultValues: props.initialValues ? props.initialValues : undefined,
    resolver: props.validationResolver,
  })

  const router = useRouter();

  const {mutateAsync: save, error} = props.mutationHook({
    onSuccess: () => {
      toast.success("Saved successfully")
      if(props.invalidateList){
      props.invalidateList().catch((err) => {
        errorLog({
          error: err,
          msg: "Failed to invalidate list",
        })
      });
      }
      if (props.initialValues?.id && props.invalidateById) {
        props.invalidateById({id: props.initialValues.id}).catch((err) => {
          errorLog({
            error: err,
            msg: "Failed to invalidate item",
          })
        });
      }
    }
  })

  const afterSubmit = () => {
    if (props.afterSubmit) {
      props.afterSubmit();
    }
    if (props.returnPath) {
      router.push(props.returnPath);
    }
  }

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      await save(data);
      afterSubmit();
    } catch (err: any) {
      const serverValidation: Record<string, string> = error?.shape?.extensions?.validation;
      if (error?.shape?.extensions?.validation) {
        Object.entries(serverValidation).forEach(([key, value]) => {
          const k: FieldPath<T> = key as FieldPath<T>;
          methods.setError(k, {
            type: "server",
            message: value
          })
        })
      }

      errorLog({
        error: err,
        msg: "Failed to save"
      })
    }
  }

  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
    if (props.returnPath) {
      router.push(props.returnPath);
    }
  }

  return <FormSubmitFnProvider onSubmit={methods.handleSubmit(onSubmit)}>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {props.children({methods})}
          {!!error && <Grid size={{ xs: 12 }}><Alert severity={'error'}>
              Error while saving - &ldquo;{error.message}&ldquo;
          </Alert></Grid>}
        </Grid>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{marginTop: 2}}
        >
          <FormControlButtons
            formState={methods.formState}
            onCancel={onCancel}
          />
        </Stack>
      </form>
    </FormProvider>
  </FormSubmitFnProvider>
}

export default BaseForm;