import { useEffect, useState } from 'react';
import { fetchOrders, createOrder } from '../services/api';
import { Order } from '../../shared/types/Order';

const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchOrders();
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const addOrder = async (newOrder: Order) => {
        try {
            const createdOrder = await createOrder(newOrder);
            setOrders((prevOrders) => [...prevOrders, createdOrder]);
        } catch (err) {
            setError('Failed to create order');
        }
    };

    return { orders, loading, error, addOrder };
};

export default useOrders;