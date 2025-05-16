CREATE DATABASE pesticide;

CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    pwd VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product VARCHAR(255),
    price DECIMAL(10,2),
    dosage VARCHAR(255),
    target VARCHAR(255),
    description TEXT,
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES login(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total DECIMAL(10,2),
    name VARCHAR(255),
    address TEXT,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Delivered', 'Received', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES login(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sold (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity INT,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ADMIN TABLE
INSERT INTO admin (name, password) VALUES
('bonuk', '1234'),
('admin1', 'admin123'),
('admin2', 'secure@456'),
('superadmin', 'master@789');

-- LOGIN TABLE (Users)
INSERT INTO login (fname, lname, email, password, pwd) VALUES
('John', 'Doe', 'john.doe@example.com', 'john123', 'john123'),
('Jane', 'Smith', 'jane.smith@example.com', 'jane@456', 'jane@456'),
('Robert', 'Johnson', 'robert.j@example.com', 'robert789', 'robert789'),
('Sarah', 'Williams', 'sarah.w@example.com', 'sarah!101', 'sarah!101'),
('Michael', 'Brown', 'michael.b@example.com', 'mike2023', 'mike2023');

-- PRODUCTS TABLE
INSERT INTO products (product, description, price, quantity, target, dosage) VALUES
('Insect Killer', 'Fast-acting broad-spectrum insecticide for immediate pest control', 24.99, 100, 'Aphids, Whiteflies, Beetles', '10ml per liter of water'),
('Plant Protector', 'Systemic protection against sucking insects for up to 4 weeks', 29.99, 75, 'Scale, Mealybugs, Thrips', '5ml per liter of water'),
('Mosquito Shield', 'Outdoor mosquito control that creates a protective barrier for 30 days', 19.99, 59, 'Mosquitoes, Gnats', '15ml per liter of water'),
('Ant Annihilator', 'Indoor/outdoor ant killer with bait technology', 14.99, 95, 'Ants, Cockroaches', 'Ready-to-use spray'),
('Fungi-Free', 'Systemic fungicide that protects new growth for up to 21 days', 29.99, 40, 'Powdery Mildew, Rust', '2.5g per liter of water'),
('Root Rescue', 'Biological fungicide containing beneficial bacteria', 34.99, 25, 'Root Rot, Damping-off', '10ml per plant'),
('Leaf Saver', 'Contact fungicide that forms a protective coating', 27.50, 60, 'Leaf Spot, Blight', '5ml per liter of water'),
('Weed Wipeout', 'Non-selective herbicide that kills weeds down to the root', 32.99, 35, 'Broadleaf Weeds', '50ml per 10 liters of water'),
('Lawn Guard', 'Selective herbicide that won''t harm your grass', 45.99, 20, 'Clover, Dandelions', '20ml per 5 liters of water'),
('Pathway Pure', 'Creates a clear, weed-free surface on paths and patios', 18.99, 80, 'Moss, Algae', 'Ready-to-use spray'),
('Rat Rid', 'Weather-resistant bait blocks that control rodents', 22.50, 45, 'Rats, Mice', 'Place 1 bait station per 10 sqm'),
('Mole Master', 'Drives out burrowing pests within 24 hours', 37.99, 15, 'Moles, Voles', '1 tablet per active tunnel'),
('All-in-One Plant Protector', '3-in-1 formula against pests and diseases', 28.75, 55, 'Insects, Fungi, Mites', '15ml per liter of water'),
('Organic Pest Oil', 'Smothers pests while being safe for beneficial insects', 21.99, 65, 'Scale, Mites, Aphids', '5ml per liter of water'),
('Plant Boost Plus', 'Contains nutrients and pest-repelling essential oils', 19.50, 90, 'General Plant Health', '10ml per liter of water');

-- ORDERS TABLE (50 entries)
INSERT INTO orders (user_id, total, name, address, email, status) VALUES
(1, 44.98, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Delivered'),
(2, 64.97, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Pending'),
(3, 29.99, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Received'),
(1, 52.48, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Pending'),
(4, 19.99, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Cancelled'),
(3, 89.97, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Delivered'),
(2, 42.48, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Received'),
(4, 67.47, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Pending'),
(5, 19.99, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Delivered'),
(1, 104.95, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Pending'),
(2, 87.96, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Delivered'),
(3, 54.98, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Received'),
(5, 112.47, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Pending'),
(4, 37.98, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Cancelled'),
(1, 29.99, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Delivered'),
(2, 64.97, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Pending'),
(3, 92.96, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Received'),
(5, 44.98, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Delivered'),
(4, 77.97, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Pending'),
(1, 19.99, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Cancelled'),
(2, 129.94, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Delivered'),
(3, 34.99, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Pending'),
(5, 59.98, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Received'),
(4, 24.99, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Delivered'),
(1, 84.97, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Pending'),
(2, 39.98, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Cancelled'),
(3, 114.95, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Delivered'),
(5, 29.99, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Pending'),
(4, 64.97, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Received'),
(1, 49.98, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Delivered'),
(2, 94.97, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Pending'),
(3, 19.99, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Cancelled'),
(5, 74.97, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Delivered'),
(4, 34.99, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Pending'),
(1, 59.98, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Received'),
(2, 24.99, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Delivered'),
(3, 104.95, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Pending'),
(5, 44.98, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Cancelled'),
(4, 89.97, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Delivered'),
(1, 19.99, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Pending'),
(2, 64.97, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Received'),
(3, 29.99, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Delivered'),
(5, 92.96, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Pending'),
(4, 37.98, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Cancelled'),
(1, 112.47, 'John Doe', '123 Main St, Anytown, USA', 'john.doe@example.com', 'Delivered'),
(2, 54.98, 'Jane Smith', '456 Oak Ave, Somewhere, USA', 'jane.smith@example.com', 'Pending'),
(3, 87.96, 'Robert Johnson', '789 Pine Rd, Nowhere, USA', 'robert.j@example.com', 'Received'),
(5, 19.99, 'Michael Brown', '555 Maple St, Everywhere, USA', 'michael.b@example.com', 'Delivered'),
(4, 129.94, 'Sarah Williams', '321 Elm Blvd, Anywhere, USA', 'sarah.w@example.com', 'Pending');

-- ORDER ITEMS (for all 50 orders)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Orders 1-10 (existing)
(1, 1, 1, 24.99), (1, 2, 1, 19.99),
(2, 3, 1, 29.99), (2, 5, 1, 34.99),
(3, 3, 1, 29.99),
(4, 1, 2, 49.98), (4, 7, 1, 2.50),
(5, 2, 1, 19.99),
(6, 1, 1, 24.99), (6, 2, 1, 19.99), (6, 3, 1, 29.99), (6, 4, 1, 14.99),
(7, 1, 1, 24.99), (7, 7, 1, 17.99),
(8, 3, 1, 29.99), (8, 5, 1, 34.99),
(9, 2, 1, 19.99),
(10, 1, 4, 99.96),

-- Orders 11-20
(11, 3, 2, 59.98), (11, 5, 1, 34.99),
(12, 1, 1, 24.99), (12, 2, 1, 19.99),
(13, 1, 3, 74.97), (13, 4, 1, 14.99), (13, 6, 1, 22.50),
(14, 2, 1, 19.99), (14, 7, 1, 17.99),
(15, 3, 1, 29.99),
(16, 1, 1, 24.99), (16, 2, 1, 19.99), (16, 3, 1, 29.99),
(17, 5, 1, 34.99), (17, 6, 1, 22.50), (17, 7, 1, 17.99),
(18, 1, 1, 24.99), (18, 2, 1, 19.99),
(19, 3, 2, 59.98), (19, 4, 1, 14.99),
(20, 2, 1, 19.99),

-- Orders 21-30
(21, 1, 4, 99.96), (21, 5, 1, 34.99),
(22, 3, 1, 29.99),
(23, 2, 2, 39.98), (23, 4, 1, 14.99),
(24, 1, 1, 24.99),
(25, 3, 1, 29.99), (25, 5, 1, 34.99), (25, 7, 1, 17.99),
(26, 2, 1, 19.99), (26, 4, 1, 14.99),
(27, 1, 3, 74.97), (27, 6, 1, 22.50),
(28, 3, 1, 29.99),
(29, 2, 1, 19.99), (29, 3, 1, 29.99), (29, 5, 1, 34.99),
(30, 1, 2, 49.98),

-- Orders 31-40
(31, 3, 1, 29.99), (31, 4, 1, 14.99), (31, 7, 1, 17.99),
(32, 1, 3, 74.97), (32, 5, 1, 34.99),
(33, 2, 1, 19.99),
(34, 3, 1, 29.99), (34, 6, 1, 22.50),
(35, 1, 1, 24.99), (35, 2, 1, 19.99),
(36, 1, 1, 24.99),
(37, 3, 2, 59.98), (37, 5, 1, 34.99),
(38, 2, 1, 19.99), (38, 4, 1, 14.99),
(39, 1, 1, 24.99), (39, 3, 1, 29.99), (39, 7, 1, 17.99),
(40, 2, 1, 19.99),

-- Orders 41-50
(41, 3, 1, 29.99),
(42, 1, 2, 49.98), (42, 2, 1, 19.99),
(43, 3, 1, 29.99),
(44, 2, 1, 19.99), (44, 4, 1, 14.99),
(45, 1, 4, 99.96), (45, 5, 1, 34.99),
(46, 3, 1, 29.99), (46, 6, 1, 22.50),
(47, 2, 2, 39.98), (47, 3, 1, 29.99),
(48, 1, 1, 24.99),
(49, 2, 1, 19.99),
(50, 3, 3, 89.97), (50, 5, 1, 34.99);

-- REVIEWS TABLE
INSERT INTO reviews (name, message) VALUES
('Sarah Johnson', 'Excellent customer service! The staff helped me choose the right products for my garden pest problems. Fast shipping too!'),
('Michael Chen', 'I''ve been using this company''s products for years and they never disappoint. Consistent quality and great results every time.'),
('Emma Williams', 'The educational resources on their website helped me understand pest control better. Products work as advertised!'),
('David Brown', 'Mosquito Shield is a game-changer! Our backyard is finally usable in the evenings. Lasts the full 30 days as promised.'),
('Lisa Rodriguez', 'Ant Annihilator wiped out our ant problem overnight. I can''t believe how effective it was - and so easy to use!'),
('Robert Smith', 'Fungi-Free saved my rose bushes from powdery mildew. Saw improvement within 3 days of application. Highly recommend!'),
('Jennifer Lee', 'Weed Wipeout worked better than expected on my driveway cracks. The weeds haven''t come back after 2 months!'),
('Thomas Wilson', 'Rat Rid solved our warehouse rodent issue. The bait stations are cleverly designed to prevent accidental contact.'),
('Olivia Martinez', 'Plant Boost Plus really improved the health of my vegetable garden. Plants are greener and more pest-resistant now.'),
('James Taylor', 'Mole Master actually works! After trying everything, this finally got rid of the moles in our yard. Worth every penny.');