import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { SvgIcon } from '@mui/material';
import { rupiah } from '../../utils/currency'

export default function ProductsTable (props) {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onHandleDialogDelete = () => {},
    onHandleDialogCreate = () => {}
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Action
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Stock
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product) => {
                return (
                  <TableRow
                    hover
                    key={product._id}
                  >
                    <TableCell >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton 
                          onClick={() => onHandleDialogDelete(true, product._id)}
                          color="error" 
                          size="small"
                        >
                          <SvgIcon aria-label="delete">
                            <TrashIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton 
                          onClick={() => onHandleDialogCreate(true, product)}
                          color="success" 
                          size="small"
                        >
                          <SvgIcon aria-label="update">
                            <PencilIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell style={{width: 300}}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {product.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell style={{width: 300}}>
                      {product.description}
                    </TableCell>
                    <TableCell>
                      {rupiah(product.price)}
                    </TableCell>
                    <TableCell>
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <img 
                        style={{width: 300, height: 150, borderRadius: 10, objectFit: "cover"}} 
                        src={product.image}
                      />
                    </TableCell>
                    <TableCell>
                      {product.location}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {items.length !== 0 ? 
        <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        />: ''
      }
    </Card>
  );
};

ProductsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onHandleDialogDelete: PropTypes.func,
  onHandleDialogCreate: PropTypes.func
};
