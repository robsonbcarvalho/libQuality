exports.mockMongoClient = () => {
  const dbClient = {};
  dbClient.connect = jest.fn().mockReturnValue(dbClient);
  dbClient.close = jest.fn().mockReturnValue(dbClient);
  return dbClient;
};