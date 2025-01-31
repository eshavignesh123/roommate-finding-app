import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

async function authenticateToken(req, res) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, "secret_key"); // Verify token
    return decoded;
  } catch (err) {
    res.status(401).json({ message: "Failed to authenticate token" });
    return null;
  }
}

export default async function handler(req, res) {
  const decodedUser = await authenticateToken(req, res);
  if (!decodedUser) return; // Stop if authentication fails

  const { method } = req;
  try {
    const { db } = await connectToDatabase();

    if (method === "GET") {
      const users = await db.collection("users").find({}).toArray();

      return res.status(200).json({
        users: users.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          pronouns: user.pronouns,
          location: user.location,
          first: user.first,
          second: user.second,
          third: user.third,
          fourth: user.fourth,
          fifth: user.fifth,
          preferences: user.preferences,
          matches: user.matches,
        })),
      });
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ message: `Method ${method} not allowed` });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
