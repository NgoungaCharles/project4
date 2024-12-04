-- Drop existing tables if they exist
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Create users table with password_hash
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample user with hashed password ('password123')
INSERT INTO users (username, email, password_hash) VALUES
  ('john_doe', 'john@example.com', '$2a$10$rK7YVBWDUxXvWHx9VYgZPeIJ1uvhVoiw5XqwXsjJ1ZQ5x9ZQZ9XKm'),
  ('jane_smith', 'jane@example.com', '$2a$10$rK7YVBWDUxXvWHx9VYgZPeIJ1uvhVoiw5XqwXsjJ1ZQ5x9ZQZ9XKm');

INSERT INTO products (name, price, category) VALUES
  ('Laptop', 999.99, 'Electronics'),
  ('Smartphone', 499.99, 'Electronics'),
  ('Desk Chair', 199.99, 'Furniture');

INSERT INTO orders (user_id, total_amount, status) VALUES
  (1, 999.99, 'completed'),
  (2, 699.98, 'pending');