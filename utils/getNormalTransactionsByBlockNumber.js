const axios = require('axios');
require('dotenv').config();

const _getNormalTransactionsByBlockNumber = async(currentBlock, previousBlockNumber, walletAddress) => {
    try {
        const response = await axios.default.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=${previousBlockNumber}&endblock=${currentBlock}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);
        return response.data.result;
        
    } catch(error) {
        throw new Error(error.message)
    }
};

module.exports = _getNormalTransactionsByBlockNumber;