import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const dbConnect = () => {
  const url: string = process.env.DB_URL as string;

  mongoose
    .connect(url)
    .then(() => console.log(`Successfully connected to MongoDB Atlas!`))
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.log(error);
    });
};
