const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');

require('dotenv').config();


// MAIN ----------------------------------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true })); // Middleware для обработки данных формы
app.use(express.static(path.join(__dirname, 'public'))); // Статика для HTML и CSS

app.get('/' , function(req , res , next) {
    res.sendFile(__dirname + "/public/main.html");
})
app.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
  });

const { User, Year } = require('./models');

app.post('/calendar' , async function(req , res) {
    try {
        const ifExists = await User.findOne({ email: req.body.email});
        if(!ifExists) {
            const user = new User({
                email: req.body.email, 
                password: req.body.password
            })
            await user.save();
            const userMood = new Year({
                email: req.body.email, 
                January: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''], 
                February: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                March: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                April: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                May: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''], 
                June: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                July: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                August: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                September: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                October: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                November: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
                December: ['' , '' , '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'']
            })
            await userMood.save()
            res.sendFile(path.join(__dirname , './public/calendar.html'));

        }
        else {
            return res.redirect('/');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

app.post('/login' , async function(req , res) {
    try {
        const ifExists = await User.findOne({ email: req.body.email , password: req.body.password});
        if(ifExists === null || ifExists.length === 0) {
            return res.redirect('/')
        }
        else {
            return res.redirect('/calendar');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

app.patch('/changeMood' , async (req , res , next) => {
    const {email , month , day , mood} = req.body;
    try {
        const year = await Year.findOne({ email });

        if (!year) {
            return res.status(404).json({ error: 'Year data not found' });
        }
        year[month][day - 1] = mood;
        await year.save();
        next();
        res.json({succses : true})
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
})

app.get('/api/year' , async function(req , res){
    const email = req.query.email;

    try {
        const year = await Year.findOne({email: email});
        if (!year) return res.status(404).json({ error: 'Year data not found' });
        res.json(year)
    }
    catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
})


