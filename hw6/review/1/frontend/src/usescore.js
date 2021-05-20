import { useState } from 'react';


const client = new WebSocket('ws://localhost:4000');

const useScore = () =>{
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState([]);
	// const [print, setprint] = useState('');
	const clearMessages = () =>{
		sendData(['clear'])
	};

	client.onmessage = (byteString) => {
		const { data } = byteString;
	    const [task, payload] = JSON.parse(data);
	    switch(task){
	    	case "clear":{
	    		setMessages([]);
	    		break
	    	}
	    	case "output":{
	    		setMessages(payload)
	    		// setprint("Update")
	    		break;
	     	}
	     	case "status":{
	    		setStatus(payload)
	    		break;
	     	}
	     	// case "add":{
	     	// 	setMessages(payload)
	     	// 	setprint("Add")
	     	// 	break;
	     	// }
	     	default: break
	     	}
	};
	
	const sendData = async(data)=>{
		await client.send(JSON.stringify(data));
	}
	const sendMessage = (payload)=>{
		sendData(['input',payload]);
	};
	const checkMessage = (payload)=>{
		sendData(['check',payload]);
	}
	return{
	status,
	messages,
	sendMessage,
	clearMessages,
	checkMessage
};
}


export default useScore;