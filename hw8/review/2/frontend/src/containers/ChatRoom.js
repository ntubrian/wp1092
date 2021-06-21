import "../App.css"
import { useState } from "react"
import { Tabs, Input } from "antd"
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import ChatBox from "./ChatBox";

const { TabPane } = Tabs

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("")
  const [modalVisibie, setModalVisible] = useState(false)
  const [activeKey, setActiveKey] = useState("")

  const { chatBoxInfos, createChatBox, removeChatBox, sendMessage } = useChatBox()
  //const { sendMessage } = useChat()

  const addChatBox = () => { setModalVisible(true) }

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className="App-messages">
        <Tabs type="editable-card"
              activeKey={activeKey}
              onChange={(key) => { setActiveKey(key) }}
              onEdit={ (targetKey, action) => {
                if (action === "add") addChatBox()
                else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey))
              } }
        >
          {
            chatBoxInfos.map(({friend, key}) => (
              <TabPane tab={friend} key={key} closable={true}>
                <ChatBox me={me} friend={friend} />
              </TabPane>
            ))
          }
        </Tabs>
        <ChatModal
          visible={modalVisibie}
          onCreate={async ({ name }) => {
            setActiveKey(await createChatBox(name, me))
            setModalVisible(false)
          }}
          onCancel={() => {
            setModalVisible(false)
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message."
            })
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first."
            })
          } else {
            // TODO: change to GraphQL API
            sendMessage({ sender: me, key: activeKey, body: msg })
            setMessageInput("")
          }
        }}
      />
    </>
  )
}

export default ChatRoom