import React, { useEffect } from 'react'
import { Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Select, MenuItem, InputLabel, IconButton, SvgIcon } from '@mui/material'
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

export default function ProductsDialogForm ({dialogForm, handleDialogForm, handleForm, selectedValue}) {
    const formik = useFormik({
    initialValues: selectedValue,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(24)
        .required('Name is required'),
      description: Yup
        .string()
        .max(255)
        .required('Description is required'),
      price: Yup
        .number()
        .min(0, "Price can't 0")
        .required('Price is required')
        .positive()
        .integer(),
      stock: Yup
        .number()
        .min(0, "Stock can't 0")
        .required('Stock is required')
        .positive()
        .integer(),
      image: Yup
        .string()
        .required('Image is required'),
      location: Yup
        .string()
        .required('Location is required')
    }),
    onSubmit: async (values, helpers) => {
      console.log('values', values)
      try {
        handleForm(values)
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
   <Dialog
      open={dialogForm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">
        Create Product
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleDialogForm(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <SvgIcon aria-label="delete">
          <XMarkIcon />
        </SvgIcon>
      </IconButton>
      <DialogContent>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack 
            spacing={3} 
            style={{marginTop: 10}}
          >
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.name}
            />
            <TextField
              multiline
              minRows={3}
              error={!!(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Description"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.description}
            />
            <TextField
              error={!!(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Price"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
            />
            <TextField
              error={!!(formik.touched.stock && formik.errors.stock)}
              fullWidth
              helperText={formik.touched.stock && formik.errors.stock}
              label="Stock"
              name="stock"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.stock}
            />
            <TextField
              error={!!(formik.touched.image && formik.errors.image)}
              fullWidth
              helperText={formik.touched.image && formik.errors.image}
              label="Url Image"
              name="image"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.image}
            />
            <div>
              <img 
                style={{objectFit: "cover"}} 
                src={formik.values.image}
                width="100%"
              />
            </div>
            <div>
              <InputLabel id="demo-simple-select-label" 
                style={{marginBottom: 10}}>Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={!!(formik.touched.location && formik.errors.location)}
                fullWidth
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
                placeholder="Location"
                >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Jakarta">Jakarta</MenuItem>
                <MenuItem value="Bandung">Bandung</MenuItem>
                <MenuItem value="Lampung">Lampung</MenuItem>
              </Select>
            </div>
          </Stack>
          {formik.errors.submit && (
            <Typography
              color="error"
              sx={{ mt: 3 }}
              variant="body2"
            >
              {formik.errors.submit}
            </Typography>
          )}
            <LoadingButton
              // loading={isLoading}
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Submit
            </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}

ProductsDialogForm.propTypes = {
  dialogForm: PropTypes.bool,
  handleDialogForm: PropTypes.func,
  handleForm: PropTypes.func,
  selectedValue: PropTypes.object
};

