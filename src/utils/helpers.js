const isValidUpdate = (updates, allowedUpdates) =>
  updates.every(update => allowedUpdates.includes(update));

module.exports = {
  isValidUpdate
};
