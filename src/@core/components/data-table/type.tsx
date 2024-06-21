export interface Order {
    id: number;
    customerName: string;
    orderDate: string;
    status: string;
    amount: string;
    product: string;
  }
  
  export interface Delivery {
    orderId: number;
    address: any;
    deliveryMan: any;
    status: any;
    dayDelivery: any;
  }