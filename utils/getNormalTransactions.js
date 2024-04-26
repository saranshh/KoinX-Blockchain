const axios = require('axios');
require('dotenv').config();

const _getNormalTransactions = async(currentBlock, walletAddress) => {
    try {
        const response = await axios.default.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=${currentBlock}&sort=asc&apikey=11ASEBCBFQZC1W3T7H4J2V1EJVUPSI7G98`);
        return response.data.result;
        
    } catch(error) {
        throw new Error(error.message)
    }
};

module.exports = _getNormalTransactions;