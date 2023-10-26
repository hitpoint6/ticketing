// import mongoose from "mongoose";

// // Interface for create a new user
// interface currentUserRouterserAttrs {
//   email: string;
//   password: string;
// }

// // Interface for describing the property of user model
// interface UserModel extends mongoose.Model<UserDoc> {
//   build(attrs: currentUserRouterserAttrs): UserDoc;
// }

// // Interface to describe a User Document
// interface UserDoc extends mongoose.Document {
//   email: string;
//   password: string;
// }

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// User.build({
//   email: "afas@afa",
//   password: "password",
// });

import { model, Schema } from "mongoose";
import { Password } from "../services/password";

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const User = model<IUser>("User", userSchema);
