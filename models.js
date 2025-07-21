const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    email: String ,
    password: String
})

const User = mongoose.model('User' , userSchema , 'users');
module.exports = User;

const yearSchema = new mongoose.Schema({
    email: String ,
    January: [String], 
    February: [String],
    March: [String],
    April: [String],
    May: [String], 
    June: [String],
    July: [String],
    August: [String],
    September: [String],
    October: [String],
    November: [String],
    December: [String]
})

const Year = mongoose.model('Year' , yearSchema , 'usersMood');
module.exports = Year;