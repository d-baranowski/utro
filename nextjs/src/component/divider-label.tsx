"use client"

import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

interface Props extends React.PropsWithChildren {
  xs?: number;
  button?: React.ReactNode; // Optional button prop
}

const DividerLabel: React.FunctionComponent<Props> = function DividerLabel(props) {
  const {xs = 12, button} = props;
  const theme = useTheme();
  const labelStyle = {fontWeight: '600', color: theme.palette.primary.main, fontSize: '0.9em'};

  return (
    <Grid size={{xs}}>
      <Stack
        direction="row"
        spacing={2}
        sx={{width: '100%'}}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography sx={labelStyle}>
          {props.children}
        </Typography>
        {button && (
          <div>
            {button}
          </div>
        )}
      </Stack>
    </Grid>
  );
};

export default DividerLabel;