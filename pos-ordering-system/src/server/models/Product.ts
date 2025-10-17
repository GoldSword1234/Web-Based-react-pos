import sqlite3 from 'sqlite3';

export interface Product {
    id?: number;
    name: string;
    price: number;
    category?: string;
    createdAt?: Date;
}

export class ProductModel {
    private db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public async getAllProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM products ORDER BY name', [], (err, rows: any[]) => {
                if (err) {
                    reject(new Error(`Failed to get products: ${err.message}`));
                } else {
                    const products = rows.map((row: any) => ({
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        category: row.category,
                        createdAt: new Date(row.created_at)
                    }));
                    resolve(products);
                }
            });
        });
    }

    public async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products (name, price, category, created_at) VALUES (?, ?, ?, ?)';
            const createdAt = new Date().toISOString();
            
            this.db.run(sql, [product.name, product.price, product.category || null, createdAt], function (err) {
                if (err) {
                    reject(new Error(`Failed to create product: ${err.message}`));
                } else {
                    resolve({
                        id: this.lastID,
                        ...product,
                        createdAt: new Date(createdAt)
                    });
                }
            });
        });
    }

    public async getProductById(id: number): Promise<Product | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM products WHERE id = ?', [id], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to get product: ${err.message}`));
                } else {
                    if (!row) {
                        resolve(null);
                    } else {
                        resolve({
                            id: row.id,
                            name: row.name,
                            price: row.price,
                            category: row.category,
                            createdAt: new Date(row.created_at)
                        });
                    }
                }
            });
        });
    }

    public async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
        return new Promise((resolve, reject) => {
            const fields = [];
            const params = [];
            
            if (updates.name) {
                fields.push('name = ?');
                params.push(updates.name);
            }
            if (updates.price !== undefined) {
                fields.push('price = ?');
                params.push(updates.price);
            }
            if (updates.category !== undefined) {
                fields.push('category = ?');
                params.push(updates.category);
            }
            
            if (fields.length === 0) {
                reject(new Error('No fields to update'));
                return;
            }
            
            params.push(id);
            const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
            
            this.db.run(query, params, (err) => {
                if (err) {
                    reject(new Error(`Failed to update product: ${err.message}`));
                } else {
                    this.getProductById(id).then(resolve).catch(reject);
                }
            });
        });
    }

    public async deleteProduct(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM products WHERE id = ?';
            this.db.run(sql, [id], function (err) {
                if (err) {
                    reject(new Error(`Failed to delete product: ${err.message}`));
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    }

    public async searchProducts(searchTerm: string): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE name LIKE ? OR category LIKE ? ORDER BY name';
            const searchPattern = `%${searchTerm}%`;
            
            this.db.all(sql, [searchPattern, searchPattern], (err, rows: any[]) => {
                if (err) {
                    reject(new Error(`Failed to search products: ${err.message}`));
                } else {
                    const products = rows.map((row: any) => ({
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        category: row.category,
                        createdAt: new Date(row.created_at)
                    }));
                    resolve(products);
                }
            });
        });
    }
}