import React from 'react';
import { Product } from '../../shared/types/Product';

interface ProductGridProps {
    products: Product[];
    onSelectProduct: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelectProduct }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card" onClick={() => onSelectProduct(product)}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;