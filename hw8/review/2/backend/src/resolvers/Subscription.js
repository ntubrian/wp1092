const Subscription = {
  chatBox: {
    subscribe(parent, args, {db, pubsub}, info) {
      // TODO: existence checking
      const { chatBoxKey } = args
      return pubsub.asyncIterator(`chatBox ${chatBoxKey}`)
    }
  }
};

export { Subscription as default };
