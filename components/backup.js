import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Example icon
import ExploreIcon from "@mui/icons-material/Explore"; // Example icon
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TabDialog from './TabDialog';


// ... other imports

// Helper function to reorder the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default function Sidebar() {
  // ... existing states and functions ...
  const [tabs, setTabs] = useState([]);
  const [openListItems, setOpenListItems] = useState({});
  const [duplicates, setDuplicates] = useState([]);
  const [openClusters, setOpenClusters] = useState({});
  const [selectedTab, setSelectedTab] = useState(null);

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedTab(null);
  };
  // ...

  const [clusters, setClusters] = useState([
    {
      id: "cluster-1",
      name: "First Cluster",
      tabs: [],
    },
    // More clusters can be added dynamically
  ]);
  const [newClusterName, setNewClusterName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (option) => {
    if (option === "activity") {
      // Ask the background page to sort the tabs by activity
      chrome.runtime.sendMessage({ type: "sortTabsByActivity" }, (response) => {
        if (response.sortedTabs) {
          // Update your state with the sorted tabs
          setTabs(response.sortedTabs);
        } else {
          console.error("Failed to sort tabs by activity");
        }
      });
    } else if (option === "alphabetical") {
      // Sort alphabetically by title
      const sortedTabs = [...tabs].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setTabs(sortedTabs);
    }
    handleMenuClose();
  };

  // Make sure you have a message listener for the 'sortTabsByActivity' response in your React component
  useEffect(() => {
    const messageListener = (request, sender, sendResponse) => {
      if (request.type === "sortedTabs") {
        // Update your state with the sorted tabs
        setTabs(request.sortedTabs);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Clean up the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const addNewCluster = () => {
    if (newClusterName.trim() !== "") {
      const newCluster = {
        id: `cluster-${clusters.length + 1}`,
        name: newClusterName,
        tabs: [],
      };
      setClusters([...clusters, newCluster]);
      setNewClusterName(""); // Reset input field
    }
  };

  useEffect(() => {
    // Load clusters from local storage on component mount
    const savedClusters = localStorage.getItem("clusters");
    if (savedClusters) {
      setClusters(JSON.parse(savedClusters));
    }
  }, []);

  useEffect(() => {
    // Save clusters to local storage whenever clusters state changes
    try {
      localStorage.setItem("clusters", JSON.stringify(clusters));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [clusters]);

  // useEffect(() => {
  //   setDuplicates(findDuplicates(tabs));
  // }, [tabs]);

  const handleCloseTab = (tabId) => {
    chrome.tabs.remove(tabId);
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
  };

  const handleClickListItem = (id) => {
    setOpenListItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, (fetchedTabs) => {
      setTabs(fetchedTabs);
    });
  }, []);

  const handleClusterClick = (clusterId) => {
    setOpenClusters((prevOpenClusters) => ({
      ...prevOpenClusters,
      [clusterId]: !prevOpenClusters[clusterId],
    }));
  };

  const handleToggleCluster = (clusterId) => {
    setOpenClusters((prevOpenClusters) => ({
      ...prevOpenClusters,
      [clusterId]: !prevOpenClusters[clusterId],
    }));
  };

  const handleDeduplicate = (url) => {
    const tabsToRemove = duplicates
      .filter((tab) => tab.url === url)
      .slice(1) // Keep the first tab, remove the rest
      .map((tab) => tab.id);

    // Close all tabs except the first one
    tabsToRemove.forEach((tabId) => {
      chrome.tabs.remove(tabId);
    });

    // Update the local tabs state
    setTabs((currentTabs) =>
      currentTabs.filter((tab) => !tabsToRemove.includes(tab.id))
    );
  };

  // ...

  const handleDeleteCluster = (clusterId) => {
    // Remove the cluster from the openClusters state as well
    setOpenClusters((prevOpenClusters) => {
      const updatedOpenClusters = { ...prevOpenClusters };
      delete updatedOpenClusters[clusterId];
      return updatedOpenClusters;
    });
    // Now filter out the cluster to be deleted
    setClusters(clusters.filter((cluster) => cluster.id !== clusterId));
  };

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === "openTabs") {
        setTabs(message.tabs);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    chrome.tabs.query({ currentWindow: true }, (fetchedTabs) => {
      setTabs(fetchedTabs);
    });

    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  // Part of sidebar.js

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === "openTabs") {
        setTabs(message.tabs);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // ... other initializations

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    // Add tab update listener
    const handleTabUpdate = (tabId, changeInfo, tab) => {
      // Check if the tab's title, URL, or favIconUrl has changed
      if (
        changeInfo.status === "complete" &&
        (tab.title || tab.url || tab.favIconUrl)
      ) {
        setTabs((prevTabs) => {
          return prevTabs.map((t) => {
            if (t.id === tabId) {
              // Update the tab's properties with the new values from the updated tab
              return {
                ...t,
                title: tab.title,
                url: tab.url,
                favIconUrl: tab.favIconUrl,
              };
            }
            return t;
          });
        });
      }
    };

    // Add tab remove listener to update tabs state
    const handleTabRemove = (tabId) => {
      setTabs((prevTabs) => prevTabs.filter((t) => t.id !== tabId));
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdate);
    chrome.tabs.onRemoved.addListener(handleTabRemove);

    // ... (existing listeners and code)

    return () => {
      // Remove listeners when the component is unmounted
      chrome.runtime.onMessage.removeListener(handleMessage);
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
      chrome.tabs.onRemoved.removeListener(handleTabRemove);
    };
  }, []);

  const handleDeduplicateAll = () => {
    // Group tabs by URL
    const groupedTabs = tabs.reduce((grouped, tab) => {
      const key = tab.url;
      if (!grouped[key]) {
        grouped[key] = []; // Initialize an array for this URL if not already initialized
      }
      grouped[key].push(tab);
      return grouped;
    }, {});

    // Determine tabs to close and tabs to keep
    const tabsToClose = [];
    Object.values(groupedTabs).forEach((group) => {
      // Push all but the first tab in each group to the tabsToClose array
      tabsToClose.push(...group.slice(1).map((tab) => tab.id));
    });

    // Remove the duplicate tabs
    tabsToClose.forEach((tabId) => {
      chrome.tabs.remove(tabId); // Close the tab with this ID
    });

    // Update the local tabs state by filtering out the closed tabs
    setTabs((currentTabs) =>
      currentTabs.filter((tab) => !tabsToClose.includes(tab.id))
    );
  };

  useEffect(() => {
    const findDuplicates = (tabs) => {
      const groups = tabs.reduce((acc, tab) => {
        acc[tab.url] = acc[tab.url] || [];
        acc[tab.url].push(tab);
        return acc;
      }, {});

      // Filter out groups with only one item, as we're looking for duplicates
      const duplicateGroups = Object.values(groups).filter(
        (group) => group.length > 1
      );
      // Return an array of arrays, each containing duplicates
      return duplicateGroups;
    };

    setDuplicates(findDuplicates(tabs));
  }, [tabs]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (
      source.droppableId === "droppableTabs" &&
      destination.droppableId === "droppableTabs"
    ) {
      // Handle reordering in the same list
      const newTabs = reorder(tabs, source.index, destination.index);
      setTabs(newTabs);
      chrome.tabs.move(newTabs[destination.index].id, {
        index: destination.index,
      });
    } else if (
      source.droppableId === "droppableTabs" &&
      destination.droppableId.startsWith("cluster")
    ) {
      // Handle moving a tab from active tabs to a cluster
      const tab = tabs[source.index];
      const newTabs = [...tabs];
      newTabs.splice(source.index, 1); // Remove tab from tabs array
      setTabs(newTabs); // Update state

      const clusterId = destination.droppableId;
      const newClusters = [...clusters];
      const clusterIndex = newClusters.findIndex(
        (cluster) => cluster.id === clusterId
      );
      newClusters[clusterIndex].tabs.push(tab); // Add tab to the appropriate cluster
      setClusters(newClusters); // Update state
    }
    // You can continue to handle other cases such as moving tabs within a cluster,
    // or moving tabs from one cluster to another if needed.
  };

  console.log(duplicates);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: "100%",
          height: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            marginRight: 0,
            marginLeft: 0,
          },
        }}
        open
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <List>
            {/* Home ListItem */}
            <ListItem button onClick={() => handleClickListItem("home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Active Tabs" />
              {openListItems["home"] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openListItems["home"]} timeout="auto" unmountOnExit>
              <ListItemIcon>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleSort("activity")}>
                    Sort by Most Active
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("alphabetical")}>
                    Sort Alphabetically
                  </MenuItem>
                </Menu>
              </ListItemIcon>
              <TabDialog
                open={Boolean(selectedTab)}
                tab={selectedTab || {}}
                onClose={handleCloseDialog}
              />
              <Droppable droppableId="droppableTabs">
                {(provided) => (
                  <List
                    component="div"
                    disablePadding
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ pl: 4 }}
                  >
                    {tabs.map((tab, index) => (
                      <Draggable
                        key={tab.id}
                        draggableId={String(tab.id)}
                        index={index}
                      >
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
                                  onClick={() =>
                                    chrome.tabs.update(tab.id, { active: true })
                                  }
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
                            sx={{ paddingLeft: 2, paddingRight: 2 }}
                          >
                            <ListItemIcon sx={{ minWidth: 30, cursor: "grab" }}>
                              {" "}
                              <img
                                src={tab.favIconUrl || "default-icon.png"}
                                alt={`${tab.title} icon`}
                                style={{ width: 16, height: 16 }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={truncateText(tab.title, 12)}
                              sx={{ margin: 0 }}
                            />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Collapse>

            <ListItem button onClick={() => handleClickListItem("explore")}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Cluster Tab" />
              {openListItems["explore"] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openListItems["explore"]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {clusters.map((cluster) => (
                  <React.Fragment key={cluster.id}>
                    <ListItem
                      button
                      onClick={() => handleToggleCluster(cluster.id)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={cluster.name} />
                      {openClusters[cluster.id] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}

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
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {/* content of your tab */}
                                    {tab.content}
                                  </div>
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
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                    <Collapse
                      in={openClusters[cluster.id]}
                      timeout="auto"
                      unmountOnExit
                    ></Collapse>
                  </React.Fragment>
                ))}
                <ListItem sx={{ pl: 4 }}>
                  <TextField
                    size="small"
                    value={newClusterName}
                    onChange={(e) => setNewClusterName(e.target.value)}
                    placeholder="New cluster name"
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                  />
                  <IconButton
                    onClick={addNewCluster}
                    edge="end"
                    aria-label="add"
                  >
                    <AddIcon />
                  </IconButton>
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleClickListItem("findDuplicates")}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Find Duplicates" />
              {openListItems["findDuplicates"] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={openListItems["findDuplicates"]}
              timeout="auto"
              unmountOnExit
            >
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
            </Collapse>
          </List>
        </DragDropContext>
      </Drawer>
    </Box>
  );
}
