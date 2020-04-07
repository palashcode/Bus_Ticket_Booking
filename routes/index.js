const express = require('express');
const userRoute = require('./v1/ticketRoute');

const router = express.Router();

router.use('/', userRoute);

module.exports = router;
