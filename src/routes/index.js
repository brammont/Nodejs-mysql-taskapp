
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('main page');
});

module.exports = router;