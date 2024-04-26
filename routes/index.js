const express = require('express');
const router = new express.Router();

const { GetTransactionsByAddress } = require('../controllers/getTransactionByAddress');
const GetEthPrice = require('../controllers/getEthPrice');
const getEthBalance  = require('../controllers/getEthBalance');

router.get('/getTransactionsByAddress/:walletAddress', GetTransactionsByAddress);
router.get('/getEthPrice', GetEthPrice);
router.get('/getEthBalance/:walletAddress', getEthBalance);

module.exports = router;