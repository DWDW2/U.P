const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

// Test function for URL detection
async function testUrlDetection() {
  try {
    console.log('Testing URL detection...');
    const response = await axios.post(`${BASE_URL}/car-detection/url`, {
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    });
    console.log('URL Detection Result:', response.data);
  } catch (error) {
    console.error('URL Detection Error:', error.response?.data || error.message);
  }
}

// Test function for health check
async function testHealthCheck() {
  try {
    console.log('Testing health check...');
    const response = await axios.post(`${BASE_URL}/car-detection/health`);
    console.log('Health Check Result:', response.data);
  } catch (error) {
    console.error('Health Check Error:', error.response?.data || error.message);
  }
}

// Test function for file upload (requires an actual image file)
async function testFileUpload(imagePath) {
  try {
    console.log('Testing file upload...');
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    
    const response = await axios.post(`${BASE_URL}/car-detection/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log('File Upload Result:', response.data);
  } catch (error) {
    console.error('File Upload Error:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...\n');
  
  await testHealthCheck();
  console.log('\n' + '='.repeat(50) + '\n');
  
  await testUrlDetection();
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Uncomment the line below and provide a path to an image file to test file upload
  // await testFileUpload('/path/to/your/image.jpg');
  
  console.log('Tests completed!');
}

runTests();
