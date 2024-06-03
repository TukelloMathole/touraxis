const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const sequelize = require('./config/database');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(bodyParser.json());

// Sync database
sequelize.sync()
    .then(() => console.log('MSSQL connected'))
    .catch(err => console.log(err));

// User CRUD operations
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ error: 'User not found' });
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Task CRUD operations
app.post('/api/users/:user_id/tasks', async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, user_id: req.params.user_id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/users/:user_id/tasks/:task_id', async (req, res) => {
    try {
        const [updated] = await Task.update(req.body, { where: { id: req.params.task_id, user_id: req.params.user_id } });
        if (!updated) return res.status(404).json({ error: 'Task not found' });
        const task = await Task.findOne({ where: { id: req.params.task_id, user_id: req.params.user_id } });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/users/:user_id/tasks/:task_id', async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.task_id, user_id: req.params.user_id } });
        if (!deleted) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users/:user_id/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { user_id: req.params.user_id } });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users/:user_id/tasks/:task_id', async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.task_id, user_id: req.params.user_id } });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Scheduled job to update pending tasks
schedule.scheduleJob('* * * * *', async () => {
    try {
        const tasks = await Task.findAll({ where: { status: 'pending', date_time: { [sequelize.Op.lt]: new Date() } } });
        tasks.forEach(async (task) => {
            task.status = 'done';
            await task.save();
            console.log(`Task "${task.name}" marked as done`);
        });
    } catch (err) {
        console.error(err);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
