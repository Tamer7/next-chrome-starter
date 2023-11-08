// TabDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TabDialog = ({ open, onClose, tab }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{tab.title}</DialogTitle>
      <DialogContent>
        {/* You can add more content here if needed */}
        <p>Would you like to close this tab?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {
          onClose();
          // Add your logic to close the tab here
        }}>Close Tab</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TabDialog;
