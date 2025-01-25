"use client"

import {styled} from '@mui/material';
import {drawerCollapsedWidth, drawerWidth} from '~/component/sidebar/const';
import React from 'react';
import {useSidebar} from "~/component/sidebar/context";

interface SidebarContentWrapperProps {
  open: boolean;
}

const SidebarContentWrapper = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})<SidebarContentWrapperProps>(({theme, open}) => ({
  position: "fixed",
  left: open ? drawerWidth -1: drawerCollapsedWidth - 1,
  right: 0,
  backgroundColor: theme.palette.background.default,
  minHeight: 'calc(100vh - 64px)',
  top: '64px',
  transition: theme.transitions.create(
    'left', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen
    }
  ),
}));

const ContentWrapper: React.FunctionComponent<React.PropsWithChildren> = function ContentWrapper(props) {
  const {isOpen} = useSidebar();
  return (
    <SidebarContentWrapper open={isOpen}>
      {props.children}
    </SidebarContentWrapper>
  );
};

export default ContentWrapper;
