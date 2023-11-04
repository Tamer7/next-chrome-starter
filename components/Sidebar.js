// components/Sidebar.js
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Box,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home'; // Example icon
import ExploreIcon from '@mui/icons-material/Explore'; // Example icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// ... other imports

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default
  const [openListItems, setOpenListItems] = useState({}); // Keep track of expandable items

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickListItem = (index) => {
    setOpenListItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ marginLeft: 'auto', marginRight: 1 }}>
          <ChevronLeftIcon />
        </IconButton>
        <List>
          {/* Home ListItem */}
          <ListItem button onClick={() => handleClickListItem('home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
            {openListItems['home'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openListItems['home']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Nested items for Home */}
            </List>
          </Collapse>

          {/* Explore ListItem */}
          <ListItem button onClick={() => handleClickListItem('explore')}>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
            {openListItems['explore'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openListItems['explore']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Nested items for Explore */}
            </List>
          </Collapse>

          {/* Add more list items and collapses as needed */}
        </List>
      </Drawer>
      {!isOpen && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            margin: 0,
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: '0 50% 50% 0',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
            zIndex: 1201, // Ensuring it's above the Drawer
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
}
