// components/PageWithSidebar.js
import React from 'react';
import Sidebar from './Sidebar';
import useSidebar from '../hooks/useSidebar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

const PageWithSidebar = ({ children }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleSidebar}
        sx={{ marginRight: '20px', ...(isOpen && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageWithSidebar;
