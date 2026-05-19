// Quick connection test. Run with: node scripts/test-mongo.mjs
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI is missing from .env.local");
  process.exit(1);
}

// Parse the URI to surface what we're using (password masked)
const m = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)/);
if (!m) {
  console.error("❌ MONGODB_URI doesn't match expected mongodb+srv format");
  process.exit(1);
}
const [, user, pw, host] = m;
console.log("Connecting as:");
console.log(`  user: ${user}`);
console.log(`  pw  : ${pw.length} chars, starts with "${pw.slice(0, 2)}", ends with "${pw.slice(-2)}"`);
console.log(`  host: ${host}`);
console.log("");

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log("✅ Connected to MongoDB successfully!");
  console.log("   Database:", mongoose.connection.db.databaseName);
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error("❌ Connection failed:");
  console.error("  ", err.message);
  if (err.codeName) console.error("   codeName:", err.codeName);
  process.exit(1);
}
