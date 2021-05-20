import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import Message from './models/Message.js';

dotenv.config();

const url = process.env.MONGO_URL;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.set('useFindAndModify', false);
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const wssConnect = ws => {
	const sendData = (data)=>{
	   	ws.send(JSON.stringify(data))
	   }
	   const sendStatus = (payload)=>{
	   	 sendData(['status',payload])
	   }
	ws.onmessage = async (byteString)=>{
	   const { data } = byteString
	   const [task, payload] = JSON.parse(data)
	   switch(task){
	   	case 'input' : {
	   		const { name, subject, score } = payload
	   		let query = {name, subject}
	   		let update = { score };
	   		let options = { upsert: true, new: true, setDefaultsOnInsert: true }

	   		Message.findOneAndUpdate(query, update, options, function(error, message) {
	   			if (!error) {
			        // If the document doesn't exist
			        if (!message) {
			            // Create it
			            message = new Message({ name, subject, score })
			        }
			        // Save the document
			        message.save(function(error) {
			            if (!error) {
			                // Do something with the document
			            } else {
			                throw new Error ("Message DB save error" + error );
			            }
			        });
			    }
			});
	   	  sendData(['output',[ payload ]])
	   	  sendStatus({
	   	  	type: 'success',
	   	  	msg: 'Message sent.'
	   	  })
	   	  break
	   	}
	   	case 'check':{
	   		let query = payload;
	   		const sendQuery = async (query)=>{
	   			var res = await Message.find(query, function (err, docs) {
	   				if(err) {
	   					return err
	   				}else{
	   					return docs;
	   				}
				});
			   return res;
	   		}
	   		sendQuery(query).then((res)=> sendData(['output',res]))
	   		
	   	  sendStatus({
	   	  	type: 'success',
	   	  	msg: 'Message sent.'
	   	  })
	   	  break
	   	}
	   	case 'clear':{
	   		Message.deleteMany({},()=>{
	   			sendData(['clear'])
	   			sendStatus({type:'info',msg:'Message cleared'})
	   		})
	   		break
	   	}
	   	default: break
	   }
	}
}


mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
        wss.on('connection', wssConnect)

		const PORT = process.env.port || 4000

		server.listen(PORT, () => {
			console.log(`Listening on http://localhost:${PORT}`)
		})
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
