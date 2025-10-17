INSERT INTO users (username, password) VALUES 
('admin', 'admin123'),
('user1', 'password1'),
('user2', 'password2');

INSERT INTO stations (name) VALUES 
('Station 1'),
('Station 2'),
('Station 3');

INSERT INTO products (name, price) VALUES 
('Product A', 10.00),
('Product B', 15.50),
('Product C', 7.25);

INSERT INTO orders (userId, stationId) VALUES 
(1, 1),
(2, 2),
(1, 3);