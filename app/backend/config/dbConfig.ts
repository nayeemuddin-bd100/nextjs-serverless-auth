import mongoose, { Error } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("No Mongodb uri found");
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error: Error | any) {
    console.log(`Error => ${error.message}`);
  }
};

export default dbConnect;
