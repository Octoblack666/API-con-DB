CREATE TABLE tb_products (
    id_product CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    barcode VARCHAR(50) UNIQUE,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_customers (
    customer_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    tax_id VARCHAR(20) -- NIT opcional
);

CREATE TABLE tb_employees (
    employee_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'cashier'
);

CREATE TABLE tb_sales (
    sale_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    customer_id CHAR(36),
    employee_id CHAR(36),
    total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES tb_customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES tb_employees(employee_id)
);

CREATE TABLE tb_sale_details (
    detail_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    sale_id CHAR(36),
    product_id CHAR(36),
    quantity INT,
    unit_price DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (sale_id) REFERENCES tb_sales(sale_id),
    FOREIGN KEY (product_id) REFERENCES tb_products(id_product)
);

CREATE TABLE tb_suppliers (
    supplier_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);
