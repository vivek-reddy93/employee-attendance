const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login API...');
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'manager@company.com',
            password: 'Manager@123'
        });

        console.log('✅ Login successful!');
        console.log('Token:', response.data.token);
        console.log('User:', response.data.user);
    } catch (error) {
        console.error('❌ Login failed:');
        console.error('Error:', error.response?.data || error.message);
    }
}

testLogin();
