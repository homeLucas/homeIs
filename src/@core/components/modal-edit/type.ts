import { Order } from "../data-table/type";

export interface EditOrderModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (order: Order) => void;
    order: Order | null;
  }