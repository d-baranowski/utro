import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {FormElementBaseProps} from './types';
import useFormElementLabel from "~/component/form/hooks/use-form-element-label";
import BareGridItem from "~/component/bare-grid-item";

interface Props<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends FormElementBaseProps<TFieldValues, TName> {
  min?: number; // TODO implement and test
  max?: number; // TODO implement and test
  step?: number; // TODO implement and test
  multiple?: boolean;
}

function NumberFe<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props<TFieldValues, TName>) {
  const {
    control,
    disabled = false,
    name,
    required = false,
    xs = 6,
    min,
    max,
    step,
  } = props;

  const label = useFormElementLabel(props);

  return (
    <BareGridItem hide={props.hide} bare={props.bare} xs={xs}>
      {!props.multiple && (
        <TextFieldElement
          control={control}
          name={name}
          label={label}
          disabled={disabled}
          required={required}
          fullWidth={true}
          inputProps={{
            min: props.min,
            max: props.max,
            step: props.step,
          }}
          type={'number'}
        />
      )}
      {props.multiple && (
        <Controller
          name={name}
          control={props.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MuiAutocomplete
              freeSolo={true}
              fullWidth={true}
              multiple
              disabled={disabled}
              options={[]}
              itemType={"number"}
              value={value || []}
              onChange={(e, newValue: string[]) => {
                const result = newValue.filter(str => {
                  return !isNaN(parseFloat(str));
                }).map(t => parseFloat(t)).filter(t => {
                  if (min !== undefined) {
                    if (t < min) {
                      return false
                    }
                  }
                  if (max !== undefined) {
                    if (t > max) {
                      return false
                    }
                  }
                  if (step !== undefined && step !== 0) {
                    if (t % step !== 0) {
                      return false
                    }
                  }

                  return true
                });

                return onChange(result)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={!!error}
                  name={name}
                  inputProps={{
                    ...params.inputProps,
                    min: props.min,
                    max: props.max,
                    step: props.step,
                    type: 'number',
                  }}
                  required={props.required}
                  helperText={error ? error.message : null}
                  InputLabelProps={{
                    variant: 'outlined',
                  }}
                />
              )}
            />
          )}
        />
      )}
    </BareGridItem>
  );
}

NumberFe.isFormElement = true;
export default NumberFe;
