"use client"
import React from "react";
import {Organisation, insertSchema, updateSchema} from "~/_section/organisation/data/schema";
import {zodResolver} from "@hookform/resolvers/zod"
import StringFe from "~/component/form/elements/string-fe";
import BooleanFe from "~/component/form/elements/boolean-fe";
import NumberFe from "~/component/form/elements/number-fe";
import BaseForm from "~/component/form/base-form";
import {trpc} from "~/rpc/rq-client";
import Button from "@mui/material/Button";


interface Props {
  initialValues?: Organisation | null
  afterSubmit?: () => void
  onCancel?: () => void
  returnPath?: string
}

const Form: React.FC<Props> = (props) => {
  const utils = trpc.useUtils();

  const {data, isLoading} = trpc.organisation.getMyOrganisations.useQuery(undefined, {});

  const [state, setState] = React.useState<any>({});

  return <BaseForm<Organisation>
    initialValues={props.initialValues || null}
    returnPath={props.returnPath}
    validationResolver={zodResolver(props?.initialValues?.id ? updateSchema : insertSchema)}
    mutationHook={trpc.organisation.create.useMutation}>
    {({methods}) => {
      return (<>
        <StringFe name={"displayName"} xs={12} control={methods.control}/>
        <StringFe name={"legalName"} xs={12} control={methods.control}/>
        <Button onClick={() => {
            setState(methods.formState.errors)
        }}>Omg ERrors</Button>

        <code>{ JSON.stringify(state) }</code>
  
      </>)
    }}
  </BaseForm>
}

export default Form;