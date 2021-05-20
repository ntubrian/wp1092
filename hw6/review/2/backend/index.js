import mongo from './src/mongo.js';
import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';

// gotta load in MONGO_URL before `mongo.connect()`
// require('dotenv-defaults').config();
import dotenv from 'dotenv-defaults';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
