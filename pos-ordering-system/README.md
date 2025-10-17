# POS Ordering System

## Overview
The POS Ordering System is a web-based application designed to facilitate order management across multiple stations and tablets. It provides a user-friendly interface for managing orders, products, and stations, making it ideal for retail and hospitality environments.

## Features
- Multi-station support
- User authentication and management
- Order creation and management
- Product management
- Station selection for orders
- Responsive design for tablet use

## Technology Stack
- **Frontend**: React (TypeScript)
- **Backend**: Node.js (Express)
- **Database**: SQLite (with capability to transition to PostgreSQL)
- **Styling**: CSS

## Project Structure
```
pos-ordering-system
├── src
│   ├── server
│   ├── client
│   └── shared
├── public
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd pos-ordering-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
1. Start the server:
   ```
   npm run server
   ```

2. Start the client:
   ```
   npm run client
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

### Database Setup
- The application uses SQLite for initial development. 
- To transition to PostgreSQL, update the database connection settings in `src/server/database/connection.ts`.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.