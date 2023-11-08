import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DuplicateTabsList = ({ duplicates, handleDeduplicateAll }) => {
  return (
    <>
      {Array.isArray(duplicates) &&
        duplicates.length > 0 &&
        duplicates.map((group, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid grey",
              borderRadius: "16px",
              position: "relative",
              backgroundColor: "grey",
              padding: "15px",
              margin: "16px",
            }}
          >
            <IconButton
              onClick={handleDeduplicateAll}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(50%, -50%)",
                color: "grey",
                backgroundColor: "white",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
                fontSize: "1rem",
              }}
            >
              <CloseIcon fontSize="inherit" />
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
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
    </>
  );
};

export default DuplicateTabsList;
