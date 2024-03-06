import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

// const User = mongoose.model<IUser>("User", UserSchema);

// export default mongoose.models.User || User;
