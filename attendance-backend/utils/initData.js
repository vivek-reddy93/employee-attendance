const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = async function initData() {
    try {
        // Check if users already exist
        const existingUsers = await User.countDocuments();
        if (existingUsers > 0) {
            console.log('✅ Test users already exist');
            return;
        }

        console.log('📝 Creating test users...');

        const salt = await bcrypt.genSalt(10);

        // Create manager
        const manager = new User({
            name: 'John Manager',
            email: 'manager@company.com',
            password: await bcrypt.hash('Manager@123', salt),
            role: 'manager',
            employeeId: 'MGR001',
            department: 'IT',
        });
        await manager.save();

        // Create employees
        const employees = [
            {
                name: 'Alice Johnson',
                email: 'employee1@company.com',
                password: await bcrypt.hash('Employee@123', salt),
                role: 'employee',
                employeeId: 'EMP001',
                department: 'IT',
            },
            {
                name: 'Bob Smith',
                email: 'employee2@company.com',
                password: await bcrypt.hash('Employee@123', salt),
                role: 'employee',
                employeeId: 'EMP002',
                department: 'IT',
            },
            {
                name: 'Carol Williams',
                email: 'employee3@company.com',
                password: await bcrypt.hash('Employee@123', salt),
                role: 'employee',
                employeeId: 'EMP003',
                department: 'HR',
            },
        ];

        for (const empData of employees) {
            const employee = new User(empData);
            await employee.save();
        }

        console.log('✅ Test users created successfully!');
        console.log('');
        console.log('📋 Login Credentials:');
        console.log('Manager: manager@company.com / Manager@123');
        console.log('Employee 1: employee1@company.com / Employee@123');
        console.log('Employee 2: employee2@company.com / Employee@123');
        console.log('Employee 3: employee3@company.com / Employee@123');
        console.log('');
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};
