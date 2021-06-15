const Query = {
  statsCount(parent, { severity, locationKeywords }, { db }, info) {
    const collections = db.people;
    if (severity >= 0 && typeof locationKeywords === "string") {
      try {
        let countArr = [];
        for (let j = 0; j < locationKeywords.length; j++) {
          let count = 0;

          for (let i = 0; i < collections.length; i++) {
            if (
              collections[i].location.description.includes(
                locationKeywords[j]
              ) &&
              collections[i].severity >= severity
            ) {
              count += 1;
            }
          }
          countArr.push(count);
        }
        return countArr;
      } catch {
        return null;
      }
    } else if (typeof locationKeywords === "string") {
      try {
        let countArr = [];
        for (let j = 0; j < locationKeywords.length; j++) {
          let count = 0;

          for (let i = 0; i < collections.length; i++) {
            if (
              collections[i].location.description.includes(locationKeywords[j])
            ) {
              count += 1;
            }
          }
          countArr.push(count);
        }
        return countArr;
      } catch {
        return null;
      }
    } else {
      return [];
    }
  },
};
