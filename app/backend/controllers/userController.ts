import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../config/dbConfig";
import { IUser } from "../interfaces/userInterface";
import User from "../models/User";

//hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

//verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

//register user
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<IUser> {
  await dbConnect();
  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  return user.save();
}

//get user by email
export async function getUserByEmail(email: string): Promise<IUser | null> {
  await dbConnect();
  const user = await User.findOne({ email });
  return user || null;
}

//create jwt token
export function createToken(user: IUser): string {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );
  return token;
}
