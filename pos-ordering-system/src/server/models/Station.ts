import sqlite3 from 'sqlite3';

export interface Station {
    id?: number;
    name: string;
    createdAt?: Date;
}

export class StationModel {
    private db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public async getAllStations(): Promise<Station[]> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM stations ORDER BY name';
            this.db.all(sql, [], (err, rows: any[]) => {
                if (err) {
                    reject(new Error(`Failed to get stations: ${err.message}`));
                } else {
                    const stations = rows.map((row: any) => ({
                        id: row.id,
                        name: row.name,
                        createdAt: new Date(row.created_at)
                    }));
                    resolve(stations);
                }
            });
        });
    }

    public async createStation(station: Omit<Station, 'id' | 'createdAt'>): Promise<Station> {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO stations (name, created_at) VALUES (?, ?)';
            const createdAt = new Date().toISOString();
            
            this.db.run(sql, [station.name, createdAt], function (err) {
                if (err) {
                    reject(new Error(`Failed to create station: ${err.message}`));
                } else {
                    resolve({
                        id: this.lastID,
                        ...station,
                        createdAt: new Date(createdAt)
                    });
                }
            });
        });
    }

    public async getStationById(id: number): Promise<Station | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM stations WHERE id = ?', [id], (err, row: any) => {
                if (err) {
                    reject(new Error(`Failed to get station: ${err.message}`));
                } else {
                    if (!row) {
                        resolve(null);
                    } else {
                        resolve({
                            id: row.id,
                            name: row.name,
                            createdAt: new Date(row.created_at)
                        });
                    }
                }
            });
        });
    }

    public async updateStation(id: number, updates: Partial<Station>): Promise<Station | null> {
        return new Promise((resolve, reject) => {
            if (!updates.name) {
                reject(new Error('Station name is required'));
                return;
            }
            
            const sql = 'UPDATE stations SET name = ? WHERE id = ?';
            
            this.db.run(sql, [updates.name, id], (err) => {
                if (err) {
                    reject(new Error(`Failed to update station: ${err.message}`));
                } else {
                    this.getStationById(id).then(resolve).catch(reject);
                }
            });
        });
    }

    public async deleteStation(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM stations WHERE id = ?';
            this.db.run(sql, [id], function (err) {
                if (err) {
                    reject(new Error(`Failed to delete station: ${err.message}`));
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    }
}