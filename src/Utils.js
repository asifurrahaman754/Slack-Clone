export const sortMessage = arr => {
  let sortedMessage = arr.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  return sortedMessage;
};
