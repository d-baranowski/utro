import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {FormElementBaseProps} from './types';
import useFormElementLabel from "~/component/form/hooks/use-form-element-label";
import BareGridItem from "~/component/bare-grid-item";

interface Props<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends FormElementBaseProps<TFieldValues, TName> {
  multiple?: boolean;
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  multiline?: boolean;
  rows?: number;
  endAdornment?: React.ReactNode;
}

function StringFe<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props<TFieldValues, TName>) {
  const {
    disabled = false,
    name,
    required = false,
    xs = 6,
  } = props;

  const label = useFormElementLabel(props);
  return (
    <BareGridItem hide={props.hide} bare={props.bare} xs={xs}>
      {!props.multiple && (
        <TextFieldElement
          control={props.control}
          name={name}
          label={label}
          disabled={disabled}
          required={required}
          fullWidth={true}
          multiline={props.multiline}
          rows={props.rows}
          type={props.type}
          InputProps={{ endAdornment: props.endAdornment }}
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
              value={value || []}
              onChange={(e, newValue) => onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={!!error}
                  name={name}
                  type={props.type}
                  required={props.required}
                  helperText={error ? error.message : null}
                  InputLabelProps={{
                    shrink: true,
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

StringFe.isFormElement = true;
export default StringFe;
