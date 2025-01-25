import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FormElementBaseProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  name: TName;
  label?: string;
  xs?: number;

  disabled?: boolean;
  required?: boolean;

  bare?: boolean;
  hide?: boolean;

  control: Control<TFieldValues>;
}

export interface FormElementAutocompleteProps {
  onChange?: (val: any) => void;
  multiple?: boolean;
}

export interface AutoCompleteOption {
  id: string,
  label: string;
}