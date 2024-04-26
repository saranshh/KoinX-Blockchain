require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cron = require('node-cron');
const transactionsRouter = require('./routes/index');
const getEthPrice = require('./utils/getEthPrice')

connectDB();
const app = express();

app.use(express.json());

app.use('/api', transactionsRouter);

cron.schedule('*/10 * * * *', () => { 
    getEthPrice();
});

app.get('/', (req, res) => {
    res.send('Welcome to Ethereum Price Tracker');
});

const PORT = 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
