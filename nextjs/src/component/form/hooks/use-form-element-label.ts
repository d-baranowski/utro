import { capitalCase } from 'change-case';
import { useMemo } from 'react';

interface Props {
  name: string;
  label?: string
}

function useFormElementLabel(props: Props) {
  return useMemo(() => {
    let label = props.label;
    if (!label) {
      label = capitalCase(props.name);
    }

    return label;
  }, [props.name, props.label]);
}

export default useFormElementLabel;
