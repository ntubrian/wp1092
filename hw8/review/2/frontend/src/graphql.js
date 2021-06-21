import {gql} from "@apollo/client";

const MUTATION_CREATE_CHATBOX = gql`
    mutation ($me: String! $friend: String!){
        createChatBox(name1: $me name2: $friend) {
            id
            name
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`
const QUERY_CHATBOX_MESSAGES = gql`
    query ($me: String! $friend: String!) {
        chatBoxMessages(name1: $me name2: $friend) {
            sender{
                name
            }
            body
        }
    }
`
const MUTATION_CREATE_MESSAGE = gql`
    mutation ($me: String! $friend: String! $msgBody: String!) {
        createMessage(senderName: $me receiverName: $friend body: $msgBody) {
            sender{
                name
            }
            body
        }
    }
`

export { MUTATION_CREATE_CHATBOX, QUERY_CHATBOX_MESSAGES, MUTATION_CREATE_MESSAGE };