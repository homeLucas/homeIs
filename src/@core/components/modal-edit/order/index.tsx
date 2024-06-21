// src/components/EditOrderModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box
} from '@mui/material';
import { EditOrderModalProps } from '../type';
import { Order } from '../../data-table/type';

const EditOrderModal: React.FC<EditOrderModalProps> = ({ open, onClose, onSave, order }) => {
  const [editOrder, setEditOrder] = useState<Order | null>(null);

  useEffect(() => {
    setEditOrder(order);
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editOrder) {
      setEditOrder({
        ...editOrder,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editOrder) {
      onSave(editOrder);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Pedido</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edite as informações do pedido e clique em "Salvar" para aplicar as mudanças.
        </DialogContentText>
        {editOrder && (
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              label="Nome do Cliente"
              name="customerName"
              value={editOrder.customerName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Produto"
              name="product"
              value={editOrder.product}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Data de Compra"
              name="orderDate"
              value={editOrder.orderDate}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Custo"
              name="amount"
              value={editOrder.amount}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Status"
              name="status"
              value={editOrder.status}
              onChange={handleChange}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="secondary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderModal;
