const makeName = (name1, name2) => [name1, name2].sort().join('_');

const getUser = async (db, name) => {
  // returns the user with user.name === name
  // if no such users, create the user then return.
  let user = await db.UserModel.findOne({ name: name })
  if (!user) {
    user = await new db.UserModel({ name }).save()
    console.log(`New user "${name}" created.`)
  }
  return user
}

const getChatBox = async (db, name1, name2) => {
  // returns the chatBox with chatBox.name === makeName(name1, name2)
  // if no such chatBoxes, create the chatBox then return.
  const name = makeName(name1, name2);
  let chatBox = await db.ChatBoxModel.findOne({ name: name })
  if (!chatBox) {
    const chatBoxUsers = [await getUser(db, name1, ""), await getUser(db, name2, "")]
    chatBox = await new db.ChatBoxModel({ name: name, users: chatBoxUsers}).save()
    console.log(`New chatBox "${name}" created.`)
  }
  //return chatBox
  // or
  return chatBox.populate('users').populate({ path: 'messages', populate: 'sender' }).execPopulate()
}


export { getUser, getChatBox, makeName };