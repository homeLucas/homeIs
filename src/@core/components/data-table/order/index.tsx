// src/components/OrdersTable.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  Chip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  TextField,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types';
import { Order } from '../type';
import { ordersData as initialOrdersData } from '../data';
import ConfirmDeleteModal from '../../modal-delete';
import { toast } from 'react-toastify';
import EditOrderModal from '../../modal-edit/order';
import * as XLSX from 'xlsx';

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  Enviado: { color: 'success' },
  Pendente: { color: 'warning' },
  Entregue: { color: 'primary' },
  Cancelado: { color: 'error' }
};

const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState<Order[]>(initialOrdersData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(0);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchText, setSearchText] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, order: Order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEditModal(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setOpenConfirmDelete(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      setOrdersData(prevOrders => prevOrders.filter(order => order.id !== selectedOrder.id));
      toast.success('Pedido deletado com sucesso!');
      setSelectedOrder(null); // Reset selectedOrder after deletion
    }
    setOpenConfirmDelete(false);
  };

  const handleEditSave = (editedOrder: Order) => {
    setOrdersData(prevOrders => prevOrders.map(order => (order.id === editedOrder.id ? editedOrder : order)));
    toast.success('Pedido editado com sucesso!');
    setOpenEditModal(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = ordersData.filter(order =>
    order.product.toLowerCase().includes(searchText.toLowerCase()) || order.customerName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(ordersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, 'orders.xlsx');
  };

  return (
    <Card>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          
          label="Pesquisar Produto"
          variant="outlined"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
         <Button variant="contained" color="secondary" onClick={handleExportToExcel} startIcon={<DescriptionIcon />}>
          Exportar para Excel
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Data de compra</TableCell>
              <TableCell>Custo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order: Order) => (
              <TableRow hover key={order.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{order.customerName}</Typography>
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusObj[order.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, order.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit} style={{gap: 5}}>
                      <EditIcon fontSize="small" />
                      <Typography>Editar</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleDelete} style={{gap: 5}}>
                      <DeleteIcon fontSize="small" />
                      <Typography>Excluir</Typography>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={ordersData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ConfirmDeleteModal
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        orderId={selectedOrder}
      />
      <EditOrderModal 
        onClose={() => setOpenEditModal(false)}
        open={openEditModal}
        onSave={handleEditSave}
        order={ordersData[selectedOrder - 1]}
      />
    </Card>
  );
};

export default OrdersTable;
