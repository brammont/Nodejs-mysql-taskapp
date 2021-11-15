const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('tasks/add');
});

router.post('/add', async (req, res) => {
    const {title,url,description}= req.body;
    const newTask = {
        title,
        url,
        description,
    };
    await pool.query('INSERT INTO tasks set ?', [newTask]); 
    res.redirect('/tasks');
});
router.get('/', isLoggedIn, async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
    res.render('tasks/list', { tasks });
});
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
    req.flash('success', 'Task Removed Successfully');
    res.redirect('/tasks');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    console.log(task);
    res.render('tasks/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newTask = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newTask, id]);
    req.flash('success', 'Task Updated Successfully');
    res.redirect('/tasks');
});


module.exports= router;