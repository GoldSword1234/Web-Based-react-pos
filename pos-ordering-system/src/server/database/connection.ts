import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

// Database configuration
let database: Database<sqlite3.Database, sqlite3.Statement> | null = null;

// SQLite connection for development
export const connectToDatabase = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  if (database) {
    return database;
  }

  try {
    database = await open({
      filename: './pos_system.db',
      driver: sqlite3.Database
    });
    
    console.log('Connected to SQLite database successfully.');
    
    // Initialize tables
    await initializeTables();
    
    return database;
  } catch (error) {
    console.error('Error connecting to SQLite database:', error);
    throw error;
  }
};

// Initialize database tables
const initializeTables = async () => {
  if (!database) return;

  await database.exec(`
    CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'staff',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      station_id INTEGER NOT NULL,
      total REAL NOT NULL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      items TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (station_id) REFERENCES stations(id)
    );
  `);

  console.log('Database tables initialized.');
};

// Sequelize instance for PostgreSQL (when transitioning)
export const createPostgresConnection = () => {
  return new Sequelize(
    process.env.POSTGRES_DB || 'pos_system',
    process.env.POSTGRES_USER || 'postgres',
    process.env.POSTGRES_PASSWORD || 'password',
    {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      dialect: 'postgres',
      logging: false,
    }
  );
};

// Get database instance
export const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDatabase() first.');
  }
  return database;
};
  }
};

export { sequelize, testConnection, transitionToPostgres };