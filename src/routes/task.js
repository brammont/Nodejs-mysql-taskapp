const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/crear', (req, res) => {
    res.render('tasks/add');
});

router.post('/crear', async (req, res) => {
    const {title,url,description}= req.body;
    const newLink = {
        title,
        url,
        description,
    };
    console.log(newLink)
    //await pool.query('INSERT INTO links set ?', [newLink]); 
    let result = await pool.query('SELECT * FROM users;');
    console.log(result)
    res.send('task add');
    res.redirect('/tasks');
});

module.exports= router;