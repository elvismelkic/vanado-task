const generic = (res, error) => res.status(400).send(error);
const notFound = res => res.status(404).send({ error: "Not found" });
const invalidUpdates = res =>
  res.status(400).send({ error: "Invalid updates" });

module.exports = {
  generic,
  notFound,
  invalidUpdates
};
