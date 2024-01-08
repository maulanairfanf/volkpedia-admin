import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, CircularProgress, Container, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CartTable from 'src/sections/cart/cart-table';
import CartSearch from 'src/sections/cart/cart-search';
import fetch from 'src/hooks/use-fetch';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState(0)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  
  async function getData() {
    setIsLoading(true)
    const params = {
      limit: rowsPerPage,
      page: page + 1,
      query: query
    }
    try {
      const response = await fetch.get('/cms/cart', {params})
      console.log('response', response)
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
                  Cart
                </Typography>
              </Stack>
            </Stack>
            <CartSearch setQuery={setQuery}/>
            <CartTable
              count={countData}
              items={data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
