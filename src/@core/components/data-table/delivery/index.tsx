// src/components/DeliveryTable.tsx
import React, { useState } from 'react';
import {
  Box, Card, Chip, Table, TableRow, TableHead, TableBody, TableCell, Typography,
  TableContainer, IconButton, Menu, MenuItem, TablePagination, TextField, Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';

// ** Types Imports
import { Delivery } from '../type';
import { deliveryData } from '../data';
import ConfirmDeleteModal from '../../modal-delete';
import EditDeliveryModal from '../../modal-edit/order';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import EditOrderModal from '../../modal-edit/order';

interface StatusObj {
  [key: string]: {
    color: string;
  };
}

const statusObj: StatusObj = {
  Enviado: { color: 'success' },
  Pendente: { color: 'warning' },
  Entregue: { color: 'primary' },
  Cancelado: { color: 'error' }
};

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(deliveryData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [page, setPage] = useState(0);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchText, setSearchText] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, delivery: Delivery) => {
    setAnchorEl(event.currentTarget);
    setSelectedDelivery(delivery);
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
    if (selectedDelivery) {
      setDeliveries(prevDeliveries => prevDeliveries.filter(delivery => delivery.orderId !== selectedDelivery.orderId));
      toast.success('Entrega deletada com sucesso!');
      setSelectedDelivery(null); // Reset selectedDelivery after deletion
    }
    setOpenConfirmDelete(false);
  };

  const handleEditSave = (editedDelivery: Delivery) => {
    setDeliveries(prevDeliveries => prevDeliveries.map(delivery => (delivery.orderId === editedDelivery.orderId ? editedDelivery : delivery)));
    toast.success('Entrega editada com sucesso!');
    setOpenEditModal(false);
    setSelectedDelivery(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.address.toLowerCase().includes(searchText.toLowerCase()) ||
    delivery.deliveryMan.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(deliveries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Deliveries');
    XLSX.writeFile(wb, 'deliveries.xlsx');
  };

  return (
    <Card>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Pesquisar Entrega"
          variant="outlined"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleExportToExcel} startIcon={<DescriptionIcon />}>
          Exportar para Excel
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="deliveries table">
          <TableHead>
            <TableRow>
              <TableCell>Endereço</TableCell>
              <TableCell>Entregador</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Entrega</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDeliveries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((delivery) => (
              <TableRow hover key={delivery.orderId}>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>{delivery.deliveryMan}</TableCell>
                <TableCell>
                  <Chip
                    label={delivery.status}
                    color={statusObj[delivery.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{delivery.dayDelivery}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, delivery)}>
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
        count={deliveryData.length}
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
        orderId={selectedDelivery}
      />
      <EditOrderModal
        onClose={() => setOpenEditModal(false)}
        open={openEditModal}
        onSave={handleEditSave}
        order={deliveryData[selectedDelivery - 1]}
      />
    </Card>
  );
};

export default DeliveryTable;
