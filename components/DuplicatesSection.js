// DuplicatesSection.js
import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const DuplicatesSection = ({ duplicates, handleDeduplicateAll }) => {
  return (
    <>
      {duplicates.map((group, index) => (
        <Box key={index} sx={{ /* ... your styles here */ }}>
          <IconButton onClick={handleDeduplicateAll} sx={{ /* ... your styles here */ }}>
            <CloseIcon />
          </IconButton>
          <List component="div" disablePadding>
            {group.map((tab, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <img
                    src={tab.favIconUrl || "default-icon.png"}
                    alt={`${tab.title} icon`}
                    style={{ width: 16, height: 16 }}
                  />
                </ListItemIcon>
                <ListItemText primary={tab.title} />
                {/* ... additional actions if needed */}
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );
};

export default DuplicatesSection;
