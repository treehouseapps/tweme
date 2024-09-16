const mongoose = require('mongoose')
const connection = async (url) => {
    let retryCount = 0;
    const maxRetry = 2;


    // Function to connect to the database with retry

    while (retryCount <= maxRetry) {
        try {
            console.log(`connecting to database...`);
            await mongoose.connect(url);
            console.log('Connected to the database');
            return;
        } catch (error) {


            if (retryCount < maxRetry) {
                retryCount++;
                console.error(`Error connecting to the database (Attempt ${retryCount}/${maxRetry}):`);
                const delayMs = 1000;
                console.log(`Retrying in ${delayMs / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            } else {
                console.error('Max retry attempts reached. Unable to connect to the database.');
                throw error;
            }
        }
    }
};

module.exports = connection