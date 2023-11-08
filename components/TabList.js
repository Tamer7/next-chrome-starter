// TabList.js
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { truncateText } from './utils'; // Assuming you have this utility function

const TabList = ({ tabs, setSelectedTab, handleCloseTab, chrome }) => {
  return (
    <Droppable droppableId="droppableTabs">
      {(provided) => (
        <List
          component="div"
          disablePadding
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tabs.map((tab, index) => (
            <Draggable key={tab.id} draggableId={String(tab.id)} index={index}>
              {(provided) => (
                <ListItem
                  button
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => setSelectedTab(tab)}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="view tab"
                        onClick={() => chrome.tabs.update(tab.id, { active: true })}
                        size="small"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="close tab"
                        onClick={() => handleCloseTab(tab.id)}
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemIcon>
                    <img
                      src={tab.favIconUrl || "default-icon.png"}
                      alt={`${tab.title} icon`}
                      style={{ width: 16, height: 16 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={truncateText(tab.title, 20)} />
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default TabList;
