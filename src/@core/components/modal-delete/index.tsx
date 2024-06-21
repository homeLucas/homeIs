import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box
} from '@mui/material';
import { ConfirmDeleteModalProps } from './type';
import TrashAnimationData from '../../../../public/animations/Animation - 1716107527595.json'
import Lottie from 'react-lottie';

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm, orderId }) => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: TrashAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o pedido {orderId}?
          </DialogContentText>
          <Box display="flex" justifyContent="center">
            <Lottie options={defaultOptions} height={150} width={150} />
          </Box>
        </DialogContent>
        <DialogActions>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="secondary">
            Confirmar
          </Button>
        </Box>
        </DialogActions>
      </Dialog>
    );
  };

export default ConfirmDeleteModal;
