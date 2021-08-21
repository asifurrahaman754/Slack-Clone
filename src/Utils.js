export const sortMessage = arr => {
  let sortedMessage = arr.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  return sortedMessage;
};
