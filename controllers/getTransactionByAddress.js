const Transactions = require('../models/transactions');
const BlockTracker = require('../models/trackBlock');
const ethers = require('ethers');
const crypto = require('crypto');
const _getCurrentBlockNumber = require('../utils/getCurrentBlockNumber');
const _getNormalTransactions = require('../utils/getNormalTransactions');
const _getNormalTransactionsByBlockNumber = require('../utils/getNormalTransactionsByBlockNumber');

const getRandomId = () => {
  return crypto.randomBytes(8).toString('hex');
};

const GetTransactionsByAddress = async (request, response) => {
  try {
    const walletAddress = request.params.walletAddress;
    const page = request.query.page;
    const perPage = 10;

    if (!(walletAddress !== null && walletAddress !== ":walletAddress")) {
      return response.status(404).json({
        success: false,
        message: "Please provide valid values for walletAddress" 
      });
    }

    const isWalletAddressValid = await ethers.isAddress(walletAddress);

    if(!isWalletAddressValid) {
      return response.status(400).json({
        sucess: false,
        reason: "Provided Wallet Address is not a valid Ethereum address"
      });
    } 

    const getCurrentBlockNumberTransaction = _getCurrentBlockNumber();
    const getLastFetchedBlockNumberTransaction = BlockTracker.findOne({ walletAddress: walletAddress});
    const getTransactionsCount = Transactions.countDocuments();
    const [ currentBlockNumber, previousBlockNumber, transactionsCount ] = await Promise.all([getCurrentBlockNumberTransaction, getLastFetchedBlockNumberTransaction, getTransactionsCount]);

    if(!previousBlockNumber) {
      const _transactionsRecords = _getNormalTransactions(currentBlockNumber, walletAddress);
      const addBlockTrackerTransaction = BlockTracker.create({
        _id: getRandomId(),
        walletAddress: walletAddress,
        blockNumber: currentBlockNumber
      });

      const [_transactions, addBlockTrackerResponse] = await Promise.all([_transactionsRecords, addBlockTrackerTransaction]);

      if(_transactions.length > 0) {
        const bulkAddTransactionsResponse = await Transactions.insertMany(_transactions);
        const count = bulkAddTransactionsResponse.length;
        const totalNumberOfPages = parseInt(count / perPage);
        const transactionsResponse = await Transactions.find({}).skip().limit(perPage);

        return response.status(200).json({
          sucess: true,
          message: 'Transaction found',
          nextPage: 0 + 1,
          totalPages: totalNumberOfPages,
          result: transactionsResponse
        });
      } else {
        return response.status(204).json({
          sucess: true,
          message: 'No transactions were found',
          result: []
        });
      }
    }

    if(previousBlockNumber) {
      const _transactions = await _getNormalTransactionsByBlockNumber(currentBlockNumber, previousBlockNumber.blockNumber, walletAddress);
      if(!_transactions.length > 0) {
        const totalNumberOfPages = parseInt(transactionsCount / perPage);
        const transactionsResponse = await Transactions.find({}).skip(page? (perPage * parseInt(page)) : 0).limit(perPage);
        return response.status(200).json({
          sucess: true,
          message: 'Transaction found',
          nextPage: page? (parseInt(page) + 1) : 0,
          totalPages: totalNumberOfPages,
          result: transactionsResponse
        });
      }
      if(_transactions.length > 0) {
        await Transactions.insertMany(_transactions);
        const count = await Transactions.countDocuments();
        const totalNumberOfPages = parseInt(count / perPage);
        const transactionsResponse = await Transactions.find({}).skip(page? (perPage * page) : 0).limit(perPage);

        return response.status(200).json({
          sucess: true,
          message: 'Transaction found',
          nextPage: page? (parseInt(page) + 1) : 0,
          totalPages: totalNumberOfPages,
          result: transactionsResponse
        });
      }
    }

  } catch (error) {
    console.error(error);
    return response.status(500).json({
      sucess: false,
      error: error.message
    });
  }
};

module.exports = { GetTransactionsByAddress };
