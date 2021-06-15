const Mutation = {
  insertPeople(parent, args, { db }, info) {
    try {
      const collections = db.people;
      const repeatArr = [];
      for (let i = 0; i < args.data.length; i++) {
        for (let j = 0; collections.length; j++) {
          if (collections[j].ssn === args.data[i]) {
            collections[j].name = args.data[i].name;
            collections[j].severity = args.data[i].severity;
            collections[j].location = args.data[i].location;
            repeatArr.push(i);
          }
        }
      }

      for (let k = 0; k < args.data.length; k++) {
        if (!repeatArr.includes(j)) {
          collections.push(args.data[j]);
        }
      }
      return true;
    } catch {
      return false;
    }
  },
};
