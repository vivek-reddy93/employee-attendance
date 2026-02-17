const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

const app = express();

// Initialize database
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default database structure
db.defaults({ users: [], attendance: [] }).write();

// Make db available globally
global.db = db;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth-simple'));
app.use('/api/attendance', require('./routes/attendance-simple'));
app.use('/api/dashboard', require('./routes/dashboard-simple'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize test data
async function initData() {
    const users = db.get('users').value();
    if (users.length > 0) {
        console.log('✅ Test users already exist');
        return;
    }

    console.log('📝 Creating test users...');

    const salt = await bcrypt.genSalt(10);

    const testUsers = [
        {
            id: '1',
            name: 'John Manager',
            email: 'manager@company.com',
            password: await bcrypt.hash('Manager@123', salt),
            role: 'manager',
            employeeId: 'MGR001',
            department: 'IT',
        },
        {
            id: '2',
            name: 'Alice Johnson',
            email: 'employee1@company.com',
            password: await bcrypt.hash('Employee@123', salt),
            role: 'employee',
            employeeId: 'EMP001',
            department: 'IT',
        },
        {
            id: '3',
            name: 'Bob Smith',
            email: 'employee2@company.com',
            password: await bcrypt.hash('Employee@123', salt),
            role: 'employee',
            employeeId: 'EMP002',
            department: 'IT',
        },
        {
            id: '4',
            name: 'Carol Williams',
            email: 'employee3@company.com',
            password: await bcrypt.hash('Employee@123', salt),
            role: 'employee',
            employeeId: 'EMP003',
            department: 'HR',
        },
    ];

    db.set('users', testUsers).write();

    console.log('✅ Test users created successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('Manager: manager@company.com / Manager@123');
    console.log('Employee 1: employee1@company.com / Employee@123');
    console.log('Employee 2: employee2@company.com / Employee@123');
    console.log('Employee 3: employee3@company.com / Employee@123');
    console.log('');
}

// Start server
const PORT = process.env.PORT || 5000;

initData().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 API available at http://localhost:${PORT}/api`);
        console.log(`💾 Using JSON file database (db.json)`);
    });
});

module.exports = app;
