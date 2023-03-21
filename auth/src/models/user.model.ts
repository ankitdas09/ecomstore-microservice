import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashed = await Password.toHash(this.password);
  this.set("password", hashed);
  next();
});

userSchema.statics.build = function (attr: UserAttrs) {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
