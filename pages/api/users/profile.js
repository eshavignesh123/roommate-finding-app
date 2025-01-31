import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import { promisify } from "util";

const verifyToken = promisify(jwt.verify); // Convert callback-based function to promise

export default async function handler(req, res) {
  try {
    // Extract and verify the token
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = await verifyToken(token, 'secret_key');
    req.user = decoded; // Store user info from token

    // Connect to database
    const { db } = await connectToDatabase();

    // Set cache-control header to prevent caching
    res.setHeader('Cache-Control', 'no-store');

    // Handle GET request
    if (req.method === "GET") {
      const { id } = req.user;
      const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          pronouns: user.pronouns,
          location: user.location,
          first: user.first,
          second: user.second,
          third: user.third,
          fourth: user.fourth,
          fifth: user.fifth,
          preferences: user.preferences
        },
      });
    }

    // Handle PUT request
    if (req.method === "PUT") {
      const { id } = req.user;
      const { pronouns, location, first, second, third, fourth, fifth, preferences } = req.body;

      const updatedUser = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            pronouns: pronouns || null,
            location: location || null,
            first: first || null,
            second: second || null,
            third: third || null,
            fourth: fourth || null,
            fifth: fifth || null,
            preferences: preferences || null,
          },
        },
        { returnDocument: "after" }
      );

      if (!updatedUser.value) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser.value,
      });
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });

  } catch (error) {
    console.error("Profile API error:", error);

    // Handle token verification error separately
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
