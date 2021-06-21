import {gql, useQuery} from "@apollo/client";
import { QUERY_CHATBOX_MESSAGES } from "../graphql";
import MessageBar from "./MessageBar";
import {useEffect} from "react";

const ChatBox = ({me, friend}) => {
  const {loading, error, data, subscribeToMore} = useQuery(QUERY_CHATBOX_MESSAGES, {
      variables: {
        me,
        friend
      }
    });
  const key = [me, friend].sort().join('_')

  const subscription = gql`
      subscription {
          chatBox (chatBoxKey: ${key}){
              mutation
              data
          }
      }
  `
  useEffect(() => {
    subscribeToMore({
      document: subscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const messages = subscriptionData.data.chatBox.data
        console.log(messages)
        return {
          chatBoxMessages: messages
        }
      }
    })
  }, [subscribeToMore])

  return (
      loading ? <p>loading...</p> :
      error ? <p>error...</p> :
      data.chatBoxMessages.map(log => <MessageBar sender={log.sender.name} body={log.body} me={me}/>)
  )
}

export default ChatBox;