var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    MovieSchema = new Schema({
        id : { type : Number},
        link : { type : String},
        title : { type : String, max : 50 },
        year : { type : Number},
        score : { type : Number},
        genre : { type : String},
        poster : { type : String},
    })

module.exports = mongoose.model('Movie',MovieSchema);