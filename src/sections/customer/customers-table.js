import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,

  MenuItem,

  Select,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
export default function CustomerTable (props) {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleUpdateStatus
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
                  Email
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                return (
                  <TableRow
                    hover
                    key={customer._id}
                  >
                    <TableCell>
                      {customer.fullName}
                    </TableCell>
                    <TableCell >
                      {customer.email}
                    </TableCell>
                    <TableCell>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={customer.status}
                          onChange={(e) => handleUpdateStatus(customer._id, e.target.value)}
                          autoWidth
                        >
                          <MenuItem value="aktif">Aktif</MenuItem>
                          <MenuItem value="tidak aktif">Tidak Aktif</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                      {format(new Date(customer.createdAt), "dd/MM/yyyy")}
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

CustomerTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleUpdateStatus: PropTypes.func
};
