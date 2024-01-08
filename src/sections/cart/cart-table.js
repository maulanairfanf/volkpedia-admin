import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { rupiah } from 'src/utils/currency';
export default function CartTable (props) {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Count Product
                </TableCell>
                <TableCell>
                  Bill
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((cart) => {
                return (
                  <TableRow
                    hover
                    key={cart._id}
                  >
                    <TableCell>
                      {cart.customer.fullName}
                    </TableCell>
                    <TableCell >
                      {cart.products.length}
                    </TableCell>
                    <TableCell >
                      {rupiah(cart.bill)}
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

CartTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
