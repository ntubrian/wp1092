import "../App.css";
import { useState } from "react";
import { Tabs, Input, Tag } from "antd";
import  ChatModal  from "./ChatModal"
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"

const { TabPane } = Tabs;


const ChatRoom = ({ me, displayStatus }) => {
  
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox, setChatBoxesMsg } = useChatBox();
  const { status, Messages, sendMessage, changeChatBox } = useChat();
  const addChatBox = () => { setModalVisible(true); };

  return (
    <> 
      <div className="App-title">
        <h1>{me}'s Chat Room</h1> 
      </div>
      <div className="App-messages">
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onChange={(key) => { 
              setActiveKey(key); 
              let index = chatBoxes.findIndex(ele=>ele.key===key)
              changeChatBox(me, chatBoxes[index].friend);
            }}
            onEdit={(targetKey, action) => {
              if (action === "add") addChatBox();
              else if(action === "remove") {
                let key = removeChatBox(targetKey, activeKey);
                setActiveKey(key);
                if(key !== ""){
                  let index = chatBoxes.findIndex(ele=>ele.key===key)
                  changeChatBox(me, chatBoxes[index].friend);
                }
              }
            }}
          >
            {chatBoxes.map((
              { friend, key }) => {
                  return (
                      <TabPane tab={friend} 
                        key={key} closable={true}>
                        <p>{friend}'s chatbox.</p>
                        <div className="App-messages">
                          {Messages.map(({name, body}, i)=>(
                            name===me?
                            <p key={i}>
                              {body}<Tag color={'blue'}>{name}</Tag>
                            </p>:
                            <p key={i}>
                              <Tag color={'green'}>{name}</Tag>{body}
                            </p>
                          ))}
                        </div>
                      </TabPane>
                  );})}
          </Tabs>
          <ChatModal
            visible={modalVisible}
            onCreate={({ name }) => {
              setActiveKey(createChatBox(name, me));
              changeChatBox(me, name);
              setModalVisible(false);
            }}
            onCancel={() => {
              setModalVisible(false);
            }}
          />
        </div>
      <Input.Search
          value={messageInput}
          onChange={(e) => 
            setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message.",
              });
              return;
            } else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first.",
              });
              setMessageInput("");
              return;
            }
            let index = chatBoxes.findIndex(ele=>ele.key===activeKey)
            sendMessage(me, chatBoxes[index].friend, msg);
            //setChatBoxesMsg({ key: activeKey, name:me, body: msg });
            setMessageInput("");
          }}
    
        ></Input.Search> 
    </>);
};
export default ChatRoom;