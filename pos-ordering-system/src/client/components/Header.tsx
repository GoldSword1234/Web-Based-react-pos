import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>POS Ordering System</h1>
            <nav>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/orders">Orders</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;