import { useState } from "react";  

const useChat = () => {
  const client = new WebSocket('ws://localhost:8080');
  //const [status, setStatus] = useState({}); // { type, msg }
  const status = 0;
  const [Messages, setMessages] = useState([]);

  client.sendEvent = (e) => client.send(JSON.stringify(e));

  const sendMessage = (name, to, body)=>{
    client.sendEvent({type:"MESSAGE", data:{name:name, to:to, body:body}}) //{ name, to, body }
  }

  const changeChatBox = (name, to)=>{
    client.sendEvent({type:"CHAT", data:{name:name, to:to}}) //{ name, to }
  }
  
  client.onmessage = async (byteString)=>{
    const tmp = JSON.parse(byteString.data)
    const {type, data} = tmp
    // eslint-disable-next-line default-case
    switch(type){
      case"CHAT":{
        await setMessages(data.messages);
        //console.log(Messages);
        break
      }
      case"MESSAGE":{
        await setMessages((prev) => [...prev, data.message]);
        //console.log(Messages);
        break
      }
    }
  }


  return { status, Messages, sendMessage, changeChatBox };
};
export default useChat;
