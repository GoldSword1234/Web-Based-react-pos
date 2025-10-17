import React, { useState } from 'react';
import { Order } from '../../shared/types/Order';
import { Product } from '../../shared/types/Product';
import { Station } from '../../shared/types/Station';
import { createOrder } from '../services/api';

const OrderForm: React.FC<{ products: Product[], stations: Station[] }> = ({ products, stations }) => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const handleProductChange = (product: Product) => {
        setSelectedProducts(prev => {
            if (prev.includes(product)) {
                return prev.filter(p => p.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const handleStationChange = (station: Station) => {
        setSelectedStation(station);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedStation && userId) {
            const order: Order = {
                userId,
                stationId: selectedStation.id,
                products: selectedProducts.map(p => p.id),
            };
            await createOrder(order);
            // Reset form or handle success
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Order</h2>
            <div>
                <label>Select Station:</label>
                <select onChange={(e) => handleStationChange(stations[Number(e.target.value)])}>
                    <option value="">Select a station</option>
                    {stations.map((station, index) => (
                        <option key={station.id} value={index}>{station.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Select Products:</h3>
                {products.map(product => (
                    <div key={product.id}>
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product)}
                            onChange={() => handleProductChange(product)}
                        />
                        {product.name} - ${product.price}
                    </div>
                ))}
            </div>
            <div>
                <label>User ID:</label>
                <input
                    type="number"
                    value={userId || ''}
                    onChange={(e) => setUserId(Number(e.target.value))}
                />
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;