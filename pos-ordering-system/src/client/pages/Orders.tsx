import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import OrderForm from '../components/OrderForm';
import ProductGrid from '../components/ProductGrid';
import StationSelector from '../components/StationSelector';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Orders</h1>
            <OrderForm />
            <StationSelector />
            <ProductGrid />
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id}, Station ID: {order.stationId}, User ID: {order.userId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;