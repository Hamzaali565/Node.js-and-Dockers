import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const myCluster = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected to host ${myCluster.connection.host}`);
  } catch (error) {
    console.log("Failed To connect with database");
    process.exit(1);
  }
};

export { connectDb };
