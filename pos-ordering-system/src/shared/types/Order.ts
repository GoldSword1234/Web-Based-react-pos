export interface Order {
    id: number;
    userId: number;
    stationId: number;
    productIds: number[];
    quantity: number;
    totalAmount: number;
    orderDate: Date;
    status: 'pending' | 'completed' | 'canceled';
}