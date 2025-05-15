import express from 'express';
const router = express.Router();
import pool from '../server.js';

// ----------- PRODUCT CRUD -----------

// Show update product form
router.get('/update/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!rows.length) {
            req.flash('error', 'Product not found');
            return res.redirect('/adminview');
        }
        res.render('updateproduct.ejs', { product: rows[0], messages: req.flash() });
    } catch (err) {
        console.error('Error fetching product:', err);
        req.flash('error', 'Failed to load product');
        res.redirect('/adminview');
    }
});

// Handle update product
router.post('/update/:id', async (req, res) => {
    const { product, price, dosage, description, target, quantity } = req.body;
    if (quantity < 0) {
        req.flash('error', 'Quantity must be a positive number');
        return res.redirect(`/update/${req.params.id}`);
    }
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query(
            `UPDATE products 
             SET product = ?, price = ?, dosage = ?, 
                 description = ?, target = ?, quantity = ? 
             WHERE id = ?`,
            [
                product, 
                parseFloat(price), 
                dosage, 
                description || null, 
                target || null, 
                parseInt(quantity), 
                req.params.id
            ]
        );
        await conn.commit();
        req.flash('success', 'Product updated successfully');
        res.redirect('/adminview');
    } catch (err) {
        await conn.rollback();
        console.error('Error updating product:', err);
        req.flash('error', 'Failed to update product');
        res.redirect(`/update/${req.params.id}`);
    } finally {
        conn.release();
    }
});

// Show delete product confirmation
router.get('/delete/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!rows.length) {
            req.flash('error', 'Product not found');
            return res.redirect('/adminview');
        }
        res.render('deleteproduct.ejs', { product: rows[0], messages: req.flash() });
    } catch (err) {
        console.error('Error fetching product for deletion:', err);
        req.flash('error', 'Failed to load product');
        res.redirect('/adminview');
    }
});

// Handle delete product
router.post('/delete/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [rows] = await conn.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!rows.length) {
            req.flash('error', 'Product not found');
            return res.redirect('/adminview');
        }
        await conn.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        await conn.commit();
        req.flash('success', 'Product deleted successfully');
        res.redirect('/adminview');
    } catch (err) {
        await conn.rollback();
        console.error('Error deleting product:', err);
        req.flash('error', 'Failed to delete product');
        res.redirect(`/delete/${req.params.id}`);
    } finally {
        conn.release();
    }
});

// Handle add product
router.post('/add', async (req, res) => {
    const { product, price, dosage, description, target, quantity } = req.body;
    if (!product || !price || !dosage || !description || !target || !quantity) {
        req.flash && req.flash('error', 'All fields are required');
        return res.redirect('/addproduct');
    }
    if (quantity < 0) {
        req.flash && req.flash('error', 'Quantity must be a positive number');
        return res.redirect('/addproduct');
    }
    try {
        await pool.query(
            `INSERT INTO products (product, price, dosage, description, target, quantity) VALUES (?, ?, ?, ?, ?, ?)`,
            [product, parseFloat(price), dosage, description, target, parseInt(quantity)]
        );
        req.flash && req.flash('success', 'Product added successfully');
        res.redirect('/adminview');
    } catch (err) {
        console.error('Error adding product:', err);
        req.flash && req.flash('error', 'Failed to add product');
        res.redirect('/addproduct');
    }
});

// ----------- USER CRUD -----------

// View all users and admins
router.get('/viewuser', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, fname, lname, email, created_at FROM login ORDER BY created_at DESC');
        const [admins] = await pool.query('SELECT id, name, created_at FROM admin ORDER BY created_at DESC');
        res.render('viewuser.ejs', { users, admins, messages: req.flash() });
    } catch (err) {
        console.error('Error fetching users/admins:', err);
        req.flash('error', 'Failed to load users/admins');
        res.redirect('/adminview');
    }
});

// Show add user form
router.get('/adduser', (req, res) => {
    res.render('adduser');
});

// Handle add user form
router.post('/user/create', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
        await pool.query(
            'INSERT INTO login (fname, lname, email, password, pwd) VALUES (?, ?, ?, ?, ?)',
            [fname, lname, email, password, password]
        );
        req.flash('success', 'User created');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error creating user');
        res.redirect('/admin/adduser');
    }
});

// Show edit user form
router.get('/user/edit/:id', async (req, res) => {
    const [users] = await pool.query('SELECT * FROM login WHERE id = ?', [req.params.id]);
    if (!users.length) return res.redirect('/admin/viewuser');
    res.render('edituser', { user: users[0] });
});

// Handle edit user form
router.post('/user/edit/:id', async (req, res) => {
    const { fname, lname, email } = req.body;
    try {
        await pool.query(
            'UPDATE login SET fname=?, lname=?, email=? WHERE id=?',
            [fname, lname, email, req.params.id]
        );
        req.flash('success', 'User updated');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error updating user');
        res.redirect(`/admin/user/edit/${req.params.id}`);
    }
});

// Handle delete user
router.post('/user/delete/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM login WHERE id = ?', [req.params.id]);
        req.flash('success', 'User deleted');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error deleting user');
        res.redirect('/admin/viewuser');
    }
});

// ----------- ADMIN CRUD -----------

// Show add admin form
router.get('/addadmin', (req, res) => {
    res.render('addadmin');
});

// Handle add admin form
router.post('/create', async (req, res) => {
    const { name, password } = req.body;
    try {
        await pool.query(
            'INSERT INTO admin (name, password) VALUES (?, ?)',
            [name, password]
        );
        req.flash('success', 'Admin created');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error creating admin');
        res.redirect('/admin/addadmin');
    }
});

// Show edit admin form
router.get('/edit/:id', async (req, res) => {
    const [admins] = await pool.query('SELECT * FROM admin WHERE id = ?', [req.params.id]);
    if (!admins.length) return res.redirect('/admin/viewuser');
    res.render('editadmin', { admin: admins[0] });
});

// Handle edit admin form
router.post('/edit/:id', async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query(
            'UPDATE admin SET name=? WHERE id=?',
            [name, req.params.id]
        );
        req.flash('success', 'Admin updated');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error updating admin');
        res.redirect(`/admin/edit/${req.params.id}`);
    }
});

// Handle delete admin

router.post('/admin/delete/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM admin WHERE id = ?', [req.params.id]);
        req.flash('success', 'Admin deleted');
        res.redirect('/admin/viewuser');
    } catch (err) {
        req.flash('error', 'Error deleting admin');
        res.redirect('/admin/viewuser');
    }
});

// Show all invoices (orders) for all users
router.get('/invoices', async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT 
                o.id, 
                o.total, 
                o.created_at, 
                o.address, 
                o.status, 
                l.fname, 
                l.lname, 
                l.email AS user_email
            FROM orders o
            JOIN login l ON o.user_id = l.id
            ORDER BY o.created_at DESC
        `);
        res.render('admininvoices', { orders });
    } catch (err) {
        console.error('Error fetching invoices:', err);
        req.flash('error', 'Failed to load invoices');
        res.redirect('/adminview');
    }
});

export default router;