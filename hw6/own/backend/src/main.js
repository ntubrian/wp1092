import mongo from './mongo';
import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();
// gotta load in MONGO_URL before `mongo.connect()`
require('dotenv-defaults').config();
mongo.connect();

app.use(express.json());
app.use(cors());
app.use('/', routes);


const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
