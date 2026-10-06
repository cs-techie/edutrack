const mongoose = require('mongoose');

let mongoMemoryInstance = null;

const connectDB = async () => {
  let uri = process.env.MONGO_URI;
  
  if (uri) {
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 1500 });
      console.log(`MongoDB Connected (Configured URI): ${conn.connection.host}`);
      return uri;
    } catch (err) {
      console.warn(`Could not connect to configured MONGO_URI (${err.message}). Falling back...`);
    }
  }

  // Quick check for local mongod on port 27017
  try {
    const defaultUri = 'mongodb://127.0.0.1:27017/edutrack';
    const conn = await mongoose.connect(defaultUri, { serverSelectionTimeoutMS: 500 });
    console.log(`MongoDB Connected (Local 27017): ${conn.connection.host}`);
    return defaultUri;
  } catch (localErr) {
    // Local MongoDB not running on 27017
  }

  // Use In-Memory MongoDB Server with automatic seed data
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    if (!mongoMemoryInstance) {
      mongoMemoryInstance = await MongoMemoryServer.create();
    }
    const memoryUri = mongoMemoryInstance.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`MongoDB Connected (Auto In-Memory Mock Database): ${memoryUri}`);
    return memoryUri;
  } catch (memErr) {
    console.error('In-memory database error:', memErr.message);
    return null;
  }
};

module.exports = connectDB;
