import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types';

export default function ProductsDialogDelete ({dialogDelete, handleDialogDelete, handleDelete}) {
  return (
   <Dialog
      open={dialogDelete}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Product
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to delete this product ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialogDelete(false, '')}>Cancel</Button>
        <Button onClick={() => handleDelete()} 
          color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ProductsDialogDelete.propTypes = {
  dialogDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleDialogDelete: PropTypes.func
};

