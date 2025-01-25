"use client";

import React from 'react';
import {CheckboxElement} from 'react-hook-form-mui';
import {FieldPath, FieldValues} from 'react-hook-form';
import {alignCheckboxSx} from "./styles";
import {FormElementBaseProps} from './types';
import useFormElementLabel from "~/component/form/hooks/use-form-element-label";
import BareGridItem from "~/component/bare-grid-item";

interface Props<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends FormElementBaseProps<TFieldValues, TName> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BooleanFe<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props<TFieldValues, TName>) {
  const {
    control,
    disabled = false,
    name,
    required = false,
    xs = 6,
    onChange,
  } = props;

  const label = useFormElementLabel(props);

  return (
    <BareGridItem bare={props.bare} xs={xs} gridSx={alignCheckboxSx}>
      <CheckboxElement
        control={control}
        data-test-form-field-name={name}
        name={name}
        label={label}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
    </BareGridItem>
  );
}

BooleanFe.isFormElement = true;
export default BooleanFe;
