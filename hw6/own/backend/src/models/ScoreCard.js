// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
const mongoose = require('mongoose')
const scoreCardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name field is required"]
    },
    subject:{
        type:String,
        required:[true, "Subject field is required"]
    },
    score:{
        type:Number,
        required:[true, "Score field is required"]
    }

})

module.exports = mongoose.model('scoreCard', scoreCardSchema)
