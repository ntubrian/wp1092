const ChatBox = {
  messages(parent, args, {db}, info) {
    return Promise.all(
      parent.messages.map(mId =>
        db.MessageModel.findById(mId)
      )
    )
  },
  users(parent, args, {db}, info) {
    return Promise.all(
      parent.users.map(uId =>
        db.UserModel.findById(uId)
      )
    )
  }
}

export default ChatBox;