"use client";

import React, {useCallback, useMemo} from 'react';
import Box from '@mui/material/Box';
import MaterialDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import Paper, {PaperProps} from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import {nanoid} from 'nanoid';
import {Theme} from '@mui/material/styles/createTheme';
import {SxProps} from '@mui/material/styles';
import {Breakpoint} from '@mui/material';
import {useRouter} from 'next/navigation'


interface Props extends React.PropsWithChildren {
  title: string;
  isOpen: boolean;
  close?: () => void;
  returnPath?: string
  maxWidth?: Breakpoint;
  draggable?: boolean;
  headerStyles?: SxProps<Theme>;
  padding?: string;
  paperProps?: PaperProps;
  fullScreen?: boolean;
}

const Dialog: React.FC<Props> = function Dialog(props) {
  const router = useRouter();

  const {
    children,
    isOpen,
    title,
    maxWidth = 'sm',
    draggable = false, // TODO is broken atm
    headerStyles = {},
    padding = '10px 10px 10px 10px',
  } = props;

  const dialogID = useMemo(() => `modal_${nanoid(10)}`, []);

  const paperComponent = useMemo(() => {
    const PaperComponent = (props: PaperProps) => {
      return (
        <Draggable
          handle={`#${dialogID}`}
          cancel={'[class*="MuiDialogContent-root"]'}
        >
          <Paper {...props} />
        </Draggable>
      );
    };

    if (typeof window !== 'undefined') {
      return undefined;
    }

    if (draggable) {
      return PaperComponent;
    }

    return undefined;
  }, [draggable, dialogID, typeof window]);

  const closeAction = () => {
    if (props.close) {
      props.close();
    } else if (props.returnPath) {
      router.push(props.returnPath)
    }
  }

  const closeDialog = useCallback(
    (event: object, reason: string) => {
      if (reason !== 'backdropClick') {
        closeAction();
      }
    },
    [props.close, props.returnPath],
  );

  if (!props.close && !props.returnPath) {
    throw new Error("Dialog requires either close or returnPath prop");
  }

  return (
    <MaterialDialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby={dialogID}
      closeAfterTransition
      //        hideBackdrop={false}
      sx={{
//          backdropFilter: "blur(2px)",
//          backgroundColor:'rgba(0,0,30,0.4)',
        zIndex: 1300,
      }}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={props.fullScreen}
      PaperComponent={paperComponent}
      PaperProps={props.paperProps}
    >
      <DialogTitle
        id={dialogID}
        sx={{
          backgroundColor: '#111926',
          color: '#fff',
          pl: '18px',
          pt: '10px',
          pb: '8px',
          cursor: draggable ? 'move' : 'inherit',

          ...headerStyles,
        }}
      >
        <Grid
          justifyContent="space-between"
          container
        >
          <Grid size={{xs: 11}}>
            {title}
          </Grid>

          <Grid sx={{marginRight: '0px'}}> {/*10px*/}
            <Box sx={{cursor: 'pointer'}}>
              <CloseIcon onClick={closeAction}/>
            </Box>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: {padding},
          position: 'relative',
          //maxHeight: "none",
          //maxWidth: "none",
        }}
      >
        <Box sx={{padding: padding, maxHeight: 'none'}}>{children}</Box>
      </DialogContent>
    </MaterialDialog>
  );
};

export default Dialog;
