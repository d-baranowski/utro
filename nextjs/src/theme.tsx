"use client"
import React from 'react';
import {CssBaseline, ThemeProvider as MuithemeProvider} from "@mui/material";
import {getThemeByName} from "~/theme/theme";

const theme = getThemeByName("shadTheme", "light");

type Props = React.PropsWithChildren

const ThemeProvider: React.FunctionComponent<Props> = function ThemeProvider(props) {
  return (
    <MuithemeProvider theme={theme}>
      <CssBaseline/>

      {props.children}
    </MuithemeProvider>
  );
};

export default ThemeProvider;