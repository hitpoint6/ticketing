import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";

let mongo: any;

declare global {
  var signin: (id?: string) => Promise<string[]>;
}

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51OB48LCmzlM6VBKFZllAldEazNyzQbZExhPbvcToE2aWFR5gye4JPc4TalSwvjVeJN2KEyXFL4ZUHFep0AANXdw900nA4BenHK";

beforeAll(async () => {
  process.env.JWT_KEY = "asdfgaf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
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

global.signin = async (id?: string) => {
  const userJwt = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: "test@test.com",
    },
    process.env.JWT_KEY!
  );
  const session = { jwt: userJwt };
  const sessionJson = JSON.stringify(session);
  const encoded = Buffer.from(sessionJson).toString("base64");

  return [`session=${encoded}`];
};
