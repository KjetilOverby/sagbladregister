const mongoose = require('mongoose');

const Blade = require('./models/Blade');

mongoose.connect('mongodb:http://localhost:3000/api/blades')

Blade.find({})