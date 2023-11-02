import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";

let mongo: any;

declare global {
  var signin: () => Promise<string[]>;
}
beforeAll(async () => {
  process.env.JWT_KEY = "asdfgaf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const userJwt = jwt.sign(
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "test@test.com",
    },
    process.env.JWT_KEY!
  );
  const session = { jwt: userJwt };
  const sessionJson = JSON.stringify(session);
  const encoded = Buffer.from(sessionJson).toString("base64");

  return [`session=${encoded}`];
};
