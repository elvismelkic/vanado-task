const isValidUpdate = (updates, allowedUpdates) =>
  updates.every(update => allowedUpdates.includes(update));

const headerSetter = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
};

module.exports = {
  isValidUpdate,
  headerSetter
};
