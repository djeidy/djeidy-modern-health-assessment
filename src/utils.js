export const deduplicate = (messages, a, b) => {
  const uniques = [];
  for (let el of messages) {
    let isAlreadyThere = null;
    if (uniques.length > 0) {
      isAlreadyThere = uniques.find(unique => {
        return unique[a] === el[a] && unique[b] === el[b];
      });
    }

    if (!isAlreadyThere) {
      uniques.push(el);
    }
  }

  return uniques;
};

export const formatDate = date => {
  const tempDate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  };

  const formatted = tempDate.toLocaleTimeString('en-us', options).split(",");
  return `${formatted[0]} ${formatted[1]}, ${formatted[2]} at ${formatted[3]}`
};
