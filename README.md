# Koinx-Blockchain

1. Clone the repository:
   ```bash
   git clone https://github.com/saranshh/KoinX-Blockchain
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash 
   ETHERSCAN_API_KEY=<Your Etherscan API key>
   MONGO_URI=<Your MongoDB connection URI>
   ```
4. Start the server:
   ```bash
   npm start
   ```

# Take-home Assignment - Blockchain+Backend Intern

**Develop a Server Side Application to fetch Crypto Transactions of a user**

**Mandatory Tasks:-**

**Task 1:**

Develop an API using Node.js to fetch the crypto transactions of a user. 

**Route**
   ```bash
   https://koinx-blockchain.onrender.com/api/getTransactionsByAddress/:WalletAddress
   ```

**Sample input**
   ```bash
   https://koinx-blockchain.onrender.com/api/getTransactionsByAddress/0xce94e5621a5f7068253c42558c147480f38b5e0d
   ```

**Task 2:**

Build a system within the same server to fetch the price of Ethereum every 10 minutes and store it in the database. 

**Route**
   ```bash
   https://koinx-blockchain.onrender.com/api/getEthPrice
   ```

**Input**
   ```bash
   https://koinx-blockchain.onrender.com/api/getEthPrice
   ```

**Task 3:**

Develop a `GET` API for a user where they give their address as an input and get their current balance and current price of ether as output. 

**Route**
 ```bash
   https://koinx-blockchain.onrender.com/api/getEthBalance/:WalletAddress
   ```

**Input**
 ```bash
   https://koinx-blockchain.onrender.com/api/getEthBalance/0xce94e5621a5f7068253c42558c147480f38b5e0d`
   ```

**Deployed Link:**
 ```bash
   Base URL: https://koinx-blockchain.onrender.com
   ```
