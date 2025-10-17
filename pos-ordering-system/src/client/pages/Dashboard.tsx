import React from 'react';
import { Link } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import ProductGrid from '../components/ProductGrid';
import StationSelector from '../components/StationSelector';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <header>
                <h1>POS Ordering System</h1>
                <nav>
                    <Link to="/orders">Orders</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
            <main>
                <StationSelector />
                <ProductGrid />
                <OrderForm />
            </main>
        </div>
    );
};

export default Dashboard;