const mongoose = require('mongoose')

const livreSchema = new mongoose.Schema({
    titre: {
        type : String,
        required : true,
        trim:true
    },
    auteur : {
        type:String,
        required:true,
        trim:true
    },
    resume:{
        type:String,
        requiered : true,
        trim: true
    },
});

const livre = mongoose.model('livre', livreSchema);

module.exports = livre;