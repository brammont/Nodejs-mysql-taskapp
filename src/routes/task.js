const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

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
    await pool.query('INSERT INTO links set ?', [newLink]); 
    let result = await pool.query('SELECT * FROM users;');
    res.send('task add');
    res.redirect('/tasks');
});
router.get('/', isLoggedIn, async (req, res) => {
    const tasks = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('tasks/list', { tasks });
});


module.exports= router;