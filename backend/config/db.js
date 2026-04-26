import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI.replace(/:[^:@]+@/, ":****@"));
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("=======================");
    console.error("MONGODB CONNECTION ERROR:");
    console.error(error.message);
    console.error("=======================");
    
    if (error.message.includes("queryTxt ECONNREFUSED")) {
      console.error("\nPossible causes:");
      console.error("1. MongoDB Atlas cluster is paused (free tier pauses after inactivity)");
      console.error("2. Check MongoDB Atlas dashboard for cluster status");
      console.error("3. Verify your IP is in Atlas Network Access whitelist");
      console.error("4. Check username/password in MONGO_URI");
    }
    
    process.exit(1);
  }
};

export default connectDB;