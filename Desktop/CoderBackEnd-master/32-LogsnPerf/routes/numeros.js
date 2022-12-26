const express = require('express')
const router = express.Router()
const child_process = require('child_process')
const logger = require('../app/logger');


router.get('/', async (req, res) => {
    let amount = Number(req.query.qty);
    let forked = child_process.fork('./32-LogsnPerf/forks/randomNumCalculator.js');
    let data
    if (amount && amount != 'NaN') {
        forked.send(`Qty: ${amount}`);
    } else {
        forked.send('Default');
    }
    forked.on('message', (msg) => {
        if (typeof msg === 'string') {
            logger.info(msg);
        }
        else {
            data = JSON.stringify(msg)
            res.render('nums', {data: data}) 
        }
  
    })

});
module.exports = router;