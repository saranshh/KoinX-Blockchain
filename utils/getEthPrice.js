const axios = require('axios');

const getEthPrice = async () => {
    const maxRetries = 5;
    const baseDelay = 1000; 
    let retryDelay = baseDelay;
  
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        return response.data.ethereum.inr;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2; 
        } else {
          throw error; 
        }
      }
    }
  
    throw new Error('Max retries exceeded');
  };

module.exports = getEthPrice;