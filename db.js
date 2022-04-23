
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();


const urlShema = mongoose.Schema({
    original_url: String,
    short_url: String
});

const Url = mongoose.model('Url', urlShema);

exports.Url = Url; 