import { useState } from "react"
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_CHATBOX, MUTATION_CREATE_MESSAGE } from "../graphql";

const useChatBox = () => {
  const [chatBoxInfos, setChatBoxInfos] = useState([])
  const makeKey = (name1, name2) => [name1, name2].sort().join('_')

  const [addChatBox] = useMutation(MUTATION_CREATE_CHATBOX);
  const [addMessage] = useMutation(MUTATION_CREATE_MESSAGE);


  const createChatBox = async (friend, me) => {
    const newKey = makeKey(me, friend)
    if (chatBoxInfos.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.")
    }
    await addChatBox({
      variables: {
        me,
        friend
      }
    });

    let newChatBoxInfos = [...chatBoxInfos]
    newChatBoxInfos.push({friend: friend, key: newKey})
    setChatBoxInfos(newChatBoxInfos)

    return newKey
  }

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey
    let lastIndex
    chatBoxInfos.forEach(({ key }, i) => {
      if (key === targetKey) lastIndex = (i - 1 >= 0) ? i - 1 : 0
    })
    const newChatBoxInfos = chatBoxInfos.filter((chatBox) => chatBox.key !== targetKey)
    if (newChatBoxInfos.length > 0) {
      if (newActiveKey === targetKey) {
        newActiveKey = newChatBoxInfos[lastIndex].key
      }
    } else {
      newActiveKey = ""
    }
    setChatBoxInfos(newChatBoxInfos)
    return newActiveKey
  }

  const sendMessage = async (payload) => {
    const { sender, key, body } = payload
    const participants = key.split("_")
    if (participants.length !== 2){
      throw new Error(`incorrect participants number. (expected: 2, actual: ${participants.length}`)
    }
    const receiver = sender === participants[0] ? participants[1] : participants[0]

    await addMessage({
      variables: {
        me: sender,
        friend: receiver,
        msgBody: body
      }
    });
  }
  return { chatBoxInfos, createChatBox, removeChatBox, sendMessage }
}

export default useChatBox