import {getUser, getChatBox, makeName} from './utils'

const Mutation = {
  async createChatBox(parent, args, { db, pubsub }, info) {
    const { name1, name2 } = args;

    if (!name1 || !name2) throw new Error("Missing chatBox name for CreateChatBox.");
    await getUser(db, name1)
    await getUser(db, name2)

    return await getChatBox(db, name1, name2);
  },
  createMessage: async function (parent, args, {db, pubsub}, info) {
    const {senderName, receiverName, body} = args;

    const chatBox = await getChatBox(db, senderName, receiverName);
    const newMessage = await new db.MessageModel({sender: await getUser(db, senderName), body}).save()
    chatBox.messages.push(newMessage);
    await chatBox.save();

    pubsub.publish(`chatBox ${makeName(senderName, receiverName)}`, {
      chatBox: {
        mutation: "",
        data: chatBox.messages
      }
    })

    return newMessage;
  },
  async clear(parent, args, { db }, info) {
    await db.UserModel.deleteMany({})
    await db.ChatBoxModel.deleteMany({})
    await db.MessageModel.deleteMany({})
    console.log('db cleared')
    return true;
  }
};

export { Mutation as default };
