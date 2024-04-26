const axios = require('axios');
require('dotenv').config();

const _getCurrentBlockNumber = async() => {
    try {
        const response = await axios.default.get(`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${process.env.ETHERSCAN_API_KEY}`);
        return parseInt(response.data.result, "radix");
        
    } catch(error) {
        throw new Error(error.message)
    }
};

module.exports = _getCurrentBlockNumber;