export const sortMessage = arr => {
  let sortedMessage = arr.sort((a, b) => a.time.localeCompare(b.time));
  return sortedMessage;
};
