import { getChatBox } from "./utils";

const Query = {
  async chatBoxMessages(parent, args, {db}, info) {
    const { name1, name2 } = args
    const chatBox = await getChatBox(db, name1, name2);

    return chatBox.messages;
  }
};

export { Query as default };
