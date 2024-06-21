import { Delivery, Order } from "../type";

export const ordersData: Order[] = [
    {
      id: 1,
      customerName: 'John Doe',
      orderDate: '2023-05-18',
      status: 'Enviado',
      amount: '$150.00',
      product: 'Laptop'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderDate: '2023-05-19',
      status: 'Pendente',
      amount: '$250.50',
      product: 'Smartphone'
    },
    {
      id: 3,
      customerName: 'Emily Johnson',
      orderDate: '2023-06-01',
      status: 'Entregue',
      amount: '$300.00',
      product: 'Tablet'
    },
    {
      id: 4,
      customerName: 'Michael Brown',
      orderDate: '2023-06-10',
      status: 'Cancelado',
      amount: '$120.00',
      product: 'Monitor'
    },
    {
      id: 5,
      customerName: 'Chris Lee',
      orderDate: '2023-07-05',
      status: 'Enviado',
      amount: '$200.00',
      product: 'Teclado'
    },
    {
      id: 6,
      customerName: 'Anna Davis',
      orderDate: '2023-07-15',
      status: 'Pendente',
      amount: '$350.00',
      product: 'Cadeira'
    },
    {
      id: 7,
      customerName: 'David Wilson',
      orderDate: '2023-08-01',
      status: 'Enviado',
      amount: '$450.00',
      product: 'Mesa'
    },
    {
      id: 8,
      customerName: 'Laura Taylor',
      orderDate: '2023-08-10',
      status: 'Entregue',
      amount: '$500.00',
      product: 'Notebook'
    },
    {
      id: 9,
      customerName: 'James Anderson',
      orderDate: '2023-08-20',
      status: 'Cancelado',
      amount: '$600.00',
      product: 'Impressora'
    },
    {
      id: 10,
      customerName: 'Linda Thomas',
      orderDate: '2023-08-25',
      status: 'Pendente',
      amount: '$700.00',
      product: 'Projetor'
    }
  ];
  
  export const deliveryData: Delivery[] = [
   {
    orderId: 1,
    address: "Rua napoleão Galvão, 167",
    dayDelivery: "22/06/2024",
    deliveryMan: "Lucas Henrique Araujo Vasconcelos",
    status: "Pendente"
   }
  ];