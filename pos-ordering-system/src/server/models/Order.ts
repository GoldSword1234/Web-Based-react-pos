import sqlite3 from 'sqlite3';

export interface Order {
    id?: number;
    userId: number;
    stationId: number;
    productIds: number[];
    total?: number;
    status?: string;
    createdAt?: Date;
}

export interface OrderWithItems extends Order {
    items: Array<{ productId: number; quantity: number; name: string; price: number }>;
}

export class OrderModel {
    private db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO orders (user_id, station_id, items, total, status, created_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            const items = JSON.stringify(orderData.productIds.map(id => ({ productId: id, quantity: 1 })));
            const total = orderData.total || 0;
            const status = orderData.status || 'pending';
            const createdAt = new Date().toISOString();
            
            const params = [orderData.userId, orderData.stationId, items, total, status, createdAt];

            this.db.run(query, params, function(err) {
                if (err) {
                    reject(new Error(`Failed to create order: ${err.message}`));
                    return;
                }
                resolve({
                    id: this.lastID,
                    ...orderData,
                    total,
                    status,
                    createdAt: new Date(createdAt)
                });
            });
        });
    }

    public async getOrders(): Promise<OrderWithItems[]> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT o.*, u.username, s.name as station_name 
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                LEFT JOIN stations s ON o.station_id = s.id
                ORDER BY o.created_at DESC
            `;

            this.db.all(query, [], (err, rows: any[]) => {
                if (err) {
                    reject(new Error(`Failed to get orders: ${err.message}`));
                    return;
                }
                
                const orders = rows.map((row: any) => ({
                    id: row.id,
                    userId: row.user_id,
                    stationId: row.station_id,
                    productIds: JSON.parse(row.items || '[]').map((item: any) => item.productId),
                    total: row.total,
                    status: row.status,
                    createdAt: new Date(row.created_at),
                    items: JSON.parse(row.items || '[]')
                }));
                
                resolve(orders);
            });
        });
    }

    public async getOrderById(id: number): Promise<OrderWithItems | null> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT o.*, u.username, s.name as station_name 
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                LEFT JOIN stations s ON o.station_id = s.id
                WHERE o.id = ?
            `;

            this.db.get(query, [id], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to get order: ${err.message}`));
                    return;
                }
                
                if (!row) {
                    resolve(null);
                    return;
                }

                const order = {
                    id: row.id,
                    userId: row.user_id,
                    stationId: row.station_id,
                    productIds: JSON.parse(row.items || '[]').map((item: any) => item.productId),
                    total: row.total,
                    status: row.status,
                    createdAt: new Date(row.created_at),
                    items: JSON.parse(row.items || '[]')
                };
                
                resolve(order);
            });
        });
    }

    public async updateOrder(id: number, updates: Partial<Order>): Promise<Order | null> {
        return new Promise((resolve, reject) => {
            const fields = [];
            const params = [];
            
            if (updates.status) {
                fields.push('status = ?');
                params.push(updates.status);
            }
            if (updates.total !== undefined) {
                fields.push('total = ?');
                params.push(updates.total);
            }
            
            if (fields.length === 0) {
                reject(new Error('No fields to update'));
                return;
            }
            
            params.push(id);
            const query = `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`;
            
            this.db.run(query, params, (err) => {
                if (err) {
                    reject(new Error(`Failed to update order: ${err.message}`));
                    return;
                }
                
                this.getOrderById(id).then(resolve).catch(reject);
            });
        });
    }

    public async deleteOrder(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM orders WHERE id = ?`;
            
            this.db.run(query, [id], function(err) {
                if (err) {
                    reject(new Error(`Failed to delete order: ${err.message}`));
                    return;
                }
                resolve(this.changes > 0);
            });
        });
    }
}
