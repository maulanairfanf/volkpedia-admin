import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, CircularProgress, Container, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ProductsTable from 'src/sections/product/products-table';
import ProductsSearch from 'src/sections/product/products-search';
import fetch from 'src/hooks/use-fetch';
import ProductsDialogDelete from 'src/sections/product/products-dialog-delete';
import ProductsDialogForm from 'src/sections/product/products-dialog-form';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState(0)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [dialogForm, setDialogForm] = useState(false)
  const [idProduct, setIdProduct] = useState('')
  const [modeForm, setModeForm] = useState('created')
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: "",
    location: "",
  })
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  function handleDialogDelete (payload, id) {
    setDialogDelete(payload)
    if (!id) setIdProduct('')
    else setIdProduct(id)
  }

  function handleDialogCreate (payload, data) {
    setDialogForm(payload)
    if (!data) setSelectedProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: "",
      location: "",
    })
    else setSelectedProduct(data)
    setModeForm("created")
  }

  function handleDialogUpdate (payload, data) {
    setDialogForm(payload)
    if (!data) setSelectedProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: "",
      location: "",
    })
    else setSelectedProduct(data)
    setModeForm("updated")
  }

  async function handleForm (value) {
    const params = {
      name: value.name,
      description: value.description,
      price: value.price,
      stock: value.stock,
      image: value.image,
      location: value.location
    }
    setIsLoading(true)
    try {
      let response 
      if (modeForm === "updated") response = await fetch.put(`/product/${value._id}`, params)
      else if (modeForm === "created") response = await fetch.post('/product', params)
      if (response) {
        await getData()
        setPage(0)
        handleDialogForm(false)
      }
      setPage(0)
    } catch (error) {
      console.log('error', error)
    }
    setIsLoading(false)
  }

  function handleDialogForm (payload) {
    setDialogForm(payload)
  }

  async function handleDelete () {
    setIsLoading(true)
    try {
      const response = await fetch.delete('/product/' + idProduct)
      if (response) {
        await getData()
        handleDialogDelete(false, '')
        setPage(0)
      }
    } catch (error) {
      console.log('error', error)
    }
    setIsLoading(false)
  }
  

  async function getData() {
    setIsLoading(true)
    const params = {
      limit: rowsPerPage,
      page: page + 1,
      query: query
    }
    try {
      const response = await fetch.get('/product', {params})
      setData(response.data.data)
      setCountData(response.data.total)
    } catch (error) {
      console.log('error', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
  
    getData()
  },[page, rowsPerPage, query])

  return (
    <>
      <Head>
        <title>
          Product
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Product
                </Typography>
              </Stack>
            </Stack>
            <ProductsSearch setQuery={setQuery}>
              <IconButton
                aria-label="close"
                onClick={() => handleDialogCreate(true)}
              >
                <SvgIcon aria-label="delete">
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </ProductsSearch>
            <ProductsTable
              count={countData}
              items={data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onHandleDialogDelete={handleDialogDelete}
              onHandleDialogCreate={handleDialogUpdate}
              />
          </Stack>
        </Container>
      </Box>
      <ProductsDialogDelete
        dialogDelete={dialogDelete}
        handleDialogDelete={handleDialogDelete}
        handleDelete={handleDelete}
      />
      <ProductsDialogForm
        dialogForm={dialogForm}
        handleDialogForm={handleDialogForm}
        handleForm={handleForm}
        selectedValue={selectedProduct}
      />
      
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
