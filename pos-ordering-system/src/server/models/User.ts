import sqlite3 from 'sqlite3';

export interface User {
    id?: number;
    username: string;
    password: string;
    role?: string;
    createdAt?: Date;
}

export class UserModel {
    private db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users (username, password, role, created_at) VALUES (?, ?, ?, ?)';
            const createdAt = new Date().toISOString();
            const role = user.role || 'staff';
            
            this.db.run(sql, [user.username, user.password, role, createdAt], function (err) {
                if (err) {
                    reject(new Error(`Failed to create user: ${err.message}`));
                } else {
                    resolve({
                        id: this.lastID,
                        ...user,
                        role,
                        createdAt: new Date(createdAt)
                    });
                }
            });
        });
    }

    public async findUserByCredentials(username: string, password: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to find user: ${err.message}`));
                } else {
                    if (!row) {
                        resolve(null);
                    } else {
                        resolve({
                            id: row.id,
                            username: row.username,
                            password: row.password,
                            role: row.role,
                            createdAt: new Date(row.created_at)
                        });
                    }
                }
            });
        });
    }

    public async findUserByUsername(username: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE username = ?', [username], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to find user: ${err.message}`));
                } else {
                    if (!row) {
                        resolve(null);
                    } else {
                        resolve({
                            id: row.id,
                            username: row.username,
                            password: row.password,
                            role: row.role,
                            createdAt: new Date(row.created_at)
                        });
                    }
                }
            });
        });
    }

    public async getUserById(id: number): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to get user: ${err.message}`));
                } else {
                    if (!row) {
                        resolve(null);
                    } else {
                        resolve({
                            id: row.id,
                            username: row.username,
                            password: row.password,
                            role: row.role,
                            createdAt: new Date(row.created_at)
                        });
                    }
                }
            });
        });
    }

    public async getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM users ORDER BY username', [], (err, rows: any[]) => {
                if (err) {
                    reject(new Error(`Failed to get users: ${err.message}`));
                } else {
                    const users = rows.map((row: any) => ({
                        id: row.id,
                        username: row.username,
                        password: row.password,
                        role: row.role,
                        createdAt: new Date(row.created_at)
                    }));
                    resolve(users);
                }
            });
        });
    }

    public async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const fields = [];
            const params = [];
            
            if (updates.username) {
                fields.push('username = ?');
                params.push(updates.username);
            }
            if (updates.password) {
                fields.push('password = ?');
                params.push(updates.password);
            }
            if (updates.role) {
                fields.push('role = ?');
                params.push(updates.role);
            }
            
            if (fields.length === 0) {
                reject(new Error('No fields to update'));
                return;
            }
            
            params.push(id);
            const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
            
            this.db.run(query, params, (err) => {
                if (err) {
                    reject(new Error(`Failed to update user: ${err.message}`));
                } else {
                    this.getUserById(id).then(resolve).catch(reject);
                }
            });
        });
    }

    public async deleteUser(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM users WHERE id = ?';
            this.db.run(sql, [id], function (err) {
                if (err) {
                    reject(new Error(`Failed to delete user: ${err.message}`));
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    }
}