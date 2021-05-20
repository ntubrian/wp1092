// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  subject: {
    type: String,
    required: [true, 'Subject field is required.']
  },
  score: {
      type: Number,
      required: [true, 'Score field is required.']
  }
})
const ScoreCardSchema = mongoose.model('ScoreCard', scoreCardSchema);
export default ScoreCardSchema;

