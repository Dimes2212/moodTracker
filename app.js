const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

