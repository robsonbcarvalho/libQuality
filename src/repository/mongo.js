const { MongoClient } = require('mongodb');

exports.getMongoClient = () => {
  const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
  return new MongoClient(uri, { useUnifiedTopology: true });
}
