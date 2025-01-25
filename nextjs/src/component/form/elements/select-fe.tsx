import React, { SyntheticEvent, useEffect } from 'react';
import { AutocompleteElement } from 'react-hook-form-mui';
import { FieldPath, FieldValues, PathValue, useWatch } from 'react-hook-form';
import { AutocompleteChangeReason } from '@mui/material';
import { nanoid } from 'nanoid';
import {FormElementBaseProps, FormElementAutocompleteProps, AutoCompleteOption} from "~/component/form/elements/types";
import useFormElementLabel from "~/component/form/hooks/use-form-element-label";
import BareGridItem from "~/component/bare-grid-item";

interface Props<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends FormElementBaseProps<TFieldValues, TName>, FormElementAutocompleteProps {
  dataHook: () => { data: AutoCompleteOption[] | undefined, isLoading: boolean, refetch: () => any };
  freeSolo?: boolean;
  optionsTransform?: (options: AutoCompleteOption[], valueId?: PathValue<TFieldValues, TName>) => AutoCompleteOption[];
  valueTransform?: {
    input?: (value: PathValue<TFieldValues, TName>) => any;
    output?: (event: SyntheticEvent, value: AutoCompleteOption, reason: AutocompleteChangeReason, details?: any) => PathValue<TFieldValues, TName>;
  };
}

function SelectFe<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props<TFieldValues, TName>) {
  const {
    control,
    optionsTransform = (o) => o,
  } = props;

  const label = useFormElementLabel(props);
  const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);

  const { data, isLoading, refetch } = props.dataHook();
  const value = useWatch({ control: control, name: props.name });

  useEffect(() => {
    if (data) {
      const options = optionsTransform(data, value);
      setOptions(options);
    }
  }, [data, optionsTransform, value]);

  const uniqueId = nanoid();

  return (
    <BareGridItem hide={props.hide} bare={props.bare} xs={props.xs}>
      <AutocompleteElement
        control={control}
        name={props.name}
        label={label}
        loading={isLoading && !data}
        options={options ?? []}
        matchId
        multiple={props.multiple}
        required={props.required}
        transform={props.valueTransform}
        textFieldProps={{
          inputProps: {
            autoComplete: uniqueId,
            id: uniqueId,
          },
        }}
        autocompleteProps={{
          freeSolo: props.freeSolo,
          autoHighlight: true,
          getOptionLabel: (option) => {
            // check if option is a string
            if (typeof option === 'string') {
              return options.find(o => o?.id === option)?.label ?? option;
            }
            return options.find(o => o?.id === option?.id)?.label ?? option?.id;
          },
          // https://github.com/orgs/react-hook-form/discussions/10964#discussioncomment-8481087
          // Might cause error: Cannot update a component while rendering a different component. To locate the bad setState()...
          readOnly: props.disabled,
          getOptionDisabled: o => o.disabled,
          fullWidth: true,
          onOpen: () => {
            void refetch();
          },
          onChange: (event, value) => {
            props?.onChange?.(value);
          },
        }}
      />
    </BareGridItem>
  );
}

export default SelectFe;