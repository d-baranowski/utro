"use client";

import React from "react";
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Logo from '../logo';
import ProfileSection from './profile';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from "@mui/material/IconButton";
import {useSidebar} from "~/component/sidebar/context";

const Header: React.FC = () => {
  const theme = useTheme();
  const {toggleSidebar, isOpen} = useSidebar();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          flexDirection: "row",
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            width: '52px',
            height: '52px',
            fontSize: '1.2rem',
            transition: 'all .2s ease-in-out',
          }}
          // onClick={handleLeftDrawerToggle}
          color="inherit"
        >
          {!isOpen && <MenuIcon/>}
          {isOpen && <MenuOpenIcon/>}
        </IconButton>
        <Box component="span" sx={{display: {xs: 'none', md: 'block'}, flexGrow: 1, marginLeft: 2}}>
          <Logo/>
        </Box>
      </Box>

      <Box sx={{flexGrow: 1}}/>
      <Box sx={{flexGrow: 1}}/>

      <ProfileSection/>
    </>
  );
};

export default Header;
