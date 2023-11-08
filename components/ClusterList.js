import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const ClusterList = ({
  clusters,
  openClusters,
  handleToggleCluster,
  handleDeleteCluster,
  newClusterName,
  setNewClusterName,
  addNewCluster,
}) => {
  return (
    <List component="div" disablePadding>
      {clusters.map((cluster) => (
        <React.Fragment key={cluster.id}>
          <ListItem button onClick={() => handleToggleCluster(cluster.id)}>
            <ListItemText primary={cluster.name} />
            <Droppable droppableId={`cluster-${cluster.id}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "lightblue"
                      : "grey",
                  }}
                >
                  {cluster.tabs.map((tab, index) => (
                    <Draggable
                      key={tab.id}
                      draggableId={tab.id}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* content of your tab */}
                          {tab.content}
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteCluster(cluster.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </React.Fragment>
      ))}
      <ListItem>
        <TextField
          size="small"
          value={newClusterName}
          onChange={(e) => setNewClusterName(e.target.value)}
          placeholder="New cluster name"
          variant="outlined"
        />
        <IconButton onClick={addNewCluster}>
          <AddIcon />
        </IconButton>
      </ListItem>
    </List>
  );
};

export default ClusterList;
