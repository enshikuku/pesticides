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


INSERT INTO `reviews` (`name`, `message`, `created_at`) 
VALUES 
-- Company reviews
('Sarah Johnson', 'Excellent customer service! The staff helped me choose the right products for my garden pest problems. Fast shipping too!', '2025-04-10 09:15:22'),
('Michael Chen', 'I\'ve been using this company\'s products for years and they never disappoint. Consistent quality and great results every time.', '2025-03-22 14:30:45'),
('Emma Williams', 'The educational resources on their website helped me understand pest control better. Products work as advertised!', '2025-05-05 11:20:33'),

-- Product-specific reviews
('David Brown', 'Mosquito Shield is a game-changer! Our backyard is finally usable in the evenings. Lasts the full 30 days as promised.', '2025-04-18 16:45:10'),
('Lisa Rodriguez', 'Ant Annihilator wiped out our ant problem overnight. I can\'t believe how effective it was - and so easy to use!', '2025-05-12 08:30:15'),
('Robert Smith', 'Fungi-Free saved my rose bushes from powdery mildew. Saw improvement within 3 days of application. Highly recommend!', '2025-03-30 13:22:40'),
('Jennifer Lee', 'Weed Wipeout worked better than expected on my driveway cracks. The weeds haven\'t come back after 2 months!', '2025-04-25 10:05:55'),
('Thomas Wilson', 'Rat Rid solved our warehouse rodent issue. The bait stations are cleverly designed to prevent accidental contact.', '2025-05-08 17:30:20'),
('Olivia Martinez', 'Plant Boost Plus really improved the health of my vegetable garden. Plants are greener and more pest-resistant now.', '2025-04-15 12:15:30'),
('James Taylor', 'Mole Master actually works! After trying everything, this finally got rid of the moles in our yard. Worth every penny.', '2025-05-01 09:45:12'),
('Sophia Anderson', 'The All-in-One Plant Protector is so convenient. One product handles all my needs - pests, fungi, and mites!', '2025-04-28 14:20:05'),
('William Clark', 'Organic Pest Oil is perfect for my organic garden. Effective against aphids but safe for my ladybugs and bees.', '2025-05-10 11:10:40'),
('Ava White', 'Lawn Guard selectively removed the dandelions without harming my grass. The lawn has never looked better!', '2025-04-05 15:35:25'),
('Benjamin Harris', 'Root Rescue brought my dying plants back to life. The beneficial bacteria made a noticeable difference quickly.', '2025-05-14 10:50:18'),
('Mia Thompson', 'Pathway Pure keeps my stone walkway clean and weed-free with minimal effort. Love the ready-to-use spray bottle!', '2025-04-20 13:40:30');

INSERT INTO `products` (`id`, `product`, `description`, `price`, `quantity`, `target`, `dosage`, `created_at`, `updated_at`) 
VALUES
-- Original products (1-15)
(1, 'Insect Killer', 'Fast-acting broad-spectrum insecticide for immediate pest control', '24.99', 100, 'Aphids, Whiteflies, Beetles', '10ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 15:40:40'),
(2, 'Plant Protector', 'Systemic protection against sucking insects for up to 4 weeks', '29.99', 75, 'Scale, Mealybugs, Thrips', '5ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 15:40:40'),
(3, 'Mosquito Shield', 'Outdoor mosquito control that creates a protective barrier for 30 days', '19.99', 59, 'Mosquitoes, Gnats', '15ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 15:40:40'),
(4, 'Ant Annihilator', 'Indoor/outdoor ant killer with bait technology that destroys the entire colony', '14.99', 95, 'Ants, Cockroaches', 'Ready-to-use spray', '2025-05-15 13:32:22', '2025-05-15 15:40:40'),
(5, 'Fungi-Free', 'Systemic fungicide that protects new growth for up to 21 days', '29.99', 40, 'Powdery Mildew, Rust', '2.5g per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(6, 'Root Rescue', 'Biological fungicide containing beneficial bacteria to combat soil-borne diseases', '34.99', 25, 'Root Rot, Damping-off', '10ml per plant', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(7, 'Leaf Saver', 'Contact fungicide that forms a protective coating on plant surfaces', '27.50', 60, 'Leaf Spot, Blight', '5ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(8, 'Weed Wipeout', 'Non-selective herbicide that kills weeds down to the root within 7 days', '32.99', 35, 'Broadleaf Weeds', '50ml per 10 liters of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(9, 'Lawn Guard', 'Selective herbicide that won\'t harm your grass while eliminating common lawn weeds', '45.99', 20, 'Clover, Dandelions', '20ml per 5 liters of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(10, 'Pathway Pure', 'Creates a clear, weed-free surface on paths and patios for up to 6 months', '18.99', 80, 'Moss, Algae', 'Ready-to-use spray', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(11, 'Rat Rid', 'Weather-resistant bait blocks that control rodents in 3-7 days', '22.50', 45, 'Rats, Mice', 'Place 1 bait station per 10 sqm', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(12, 'Mole Master', 'Creates a gas underground that drives out burrowing pests within 24 hours', '37.99', 15, 'Moles, Voles', '1 tablet per active tunnel', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(13, 'All-in-One Plant Protector', '3-in-1 formula that protects against common pests and diseases', '28.75', 55, 'Insects, Fungi, Mites', '15ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(14, 'Organic Pest Oil', 'Smothers pests on contact while being safe for beneficial insects', '21.99', 65, 'Scale, Mites, Aphids', '5ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(15, 'Plant Boost Plus', 'Contains nutrients and pest-repelling essential oils to strengthen plants', '19.50', 90, 'General Plant Health', '10ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),

-- Additional products (16-25)
(16, 'Bug Blaster', 'Fast-acting insecticide that controls aphids, whiteflies, and thrips on contact', '24.99', 50, 'Aphids, Whiteflies, Thrips', '10ml per 5 liters of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(17, 'Fertilizer Plus Pest Guard', 'Slow-release fertilizer pellets with pest-repelling properties for 3 months', '39.99', 30, 'General Nutrition, Pests', '100g per square meter', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(18, 'Crawling Insect Killer', 'Natural diatomaceous earth powder for controlling crawling insects', '15.99', 75, 'Ants, Cockroaches, Fleas', 'Dust lightly on affected areas', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(19, 'Sap Shield', 'Systemic insecticide that protects plants from sap-sucking insects for up to 8 weeks', '31.50', 40, 'Aphids, Mealybugs, Scale', '5ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(20, 'Neem Oil Concentrate', 'Concentrated neem oil solution for organic pest and disease control', '26.75', 60, 'Fungi, Insects, Mites', '5-10ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(21, 'Mite Eliminator', 'Specialized formula for controlling spider mites with immediate knockdown', '29.99', 35, 'Spider Mites', '15ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(22, 'Caterpillar Control', 'Biological control for caterpillars and larvae with long-lasting protection', '42.99', 25, 'Caterpillars, Larvae', 'Apply 1 sachet per 10 plants', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(23, 'Weed Preventer', 'Dual-action formula that kills existing weeds and prevents new growth for 4 months', '37.50', 45, 'Broadleaf Weeds, Grasses', '30ml per 5 liters of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(24, 'Pro Pest Control', 'Professional-grade insecticide for commercial use with residual activity', '49.99', 20, 'Multiple Insect Species', '20ml per 10 liters of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22'),
(25, 'Eco Fungicide', 'Organic fungicide made from plant extracts to control common fungal diseases', '22.99', 55, 'Mildew, Rust, Blight', '10-15ml per liter of water', '2025-05-15 13:32:22', '2025-05-15 13:32:22');

insert into `admin` (`created_at`, `id`, `name`, `password`) values ('2025-05-16 00:24:00', 1, 'bonuk', '1234')