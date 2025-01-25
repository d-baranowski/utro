"use client"
import React from "react";
import {Organisation, insertSchema, updateSchema} from "~/_section/organisation/data/schema";
import {zodResolver} from "@hookform/resolvers/zod"
import StringFe from "~/component/form/elements/string-fe";
import BooleanFe from "~/component/form/elements/boolean-fe";
import NumberFe from "~/component/form/elements/number-fe";
import BaseForm from "~/component/form/base-form";
import {trpc} from "~/rpc/rq-client";


interface Props {
  initialValues?: Organisation | null
  afterSubmit?: () => void
  onCancel?: () => void
  returnPath?: string
}

const Form: React.FC<Props> = (props) => {
  const utils = trpc.useUtils();

  return <BaseForm<Organisation>
    initialValues={props.initialValues || null}
    returnPath={props.returnPath}
    invalidateList={utils.organisation.findAll.invalidate}
    invalidateById={utils.organisation.findById.invalidate}
    validationResolver={zodResolver(props?.initialValues?.id ? updateSchema : insertSchema)}
    mutationHook={trpc.organisation.save.useMutation}>
    {({methods}) => {
      return (<>
        <StringFe name={"name"} xs={12} control={methods.control}/>
        <NumberFe name={"maxCTR"} xs={12} control={methods.control}/>
        <BooleanFe name={"active"} xs={12} control={methods.control}/>
      </>)
    }}
  </BaseForm>
}

export default Form;