"use client"

import React from 'react';
import Button from '@mui/material/Button';
import {FormState} from 'react-hook-form-mui';
import {useFormSubmitFn} from "~/component/form/hooks/use-form-submit";

interface Props {
  onCancel?: () => void;
  disableSubmit?: boolean;
  formState: FormState<any>;
}

const FormControlButtons: React.FC<Props> = (props) => {
  const {onCancel, disableSubmit, formState} = props;
  const ctx = useFormSubmitFn();
  const onSubmitClick = React.useMemo(() => {
    if (ctx?.onSubmit) {
      return (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        ctx?.onSubmit();
      };
    }

    return undefined
  }, [ctx]);

  return <>
    <Button
      disabled={!formState.isDirty || formState.isSubmitting || disableSubmit}
      color="primary"
      loading={formState.isSubmitting}
      type={'submit'}
      variant={'contained'}
      onClick={onSubmitClick}
    >
      Save
    </Button>
    <Button
      disabled={formState.isSubmitting}
      onClick={onCancel}
      color="inherit"
      variant="contained"
    >
      Cancel
    </Button>
  </>;
};

export default FormControlButtons;
