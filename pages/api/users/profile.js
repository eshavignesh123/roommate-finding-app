// Updated code for incorporating authentication middleware
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // Auth Middleware
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Save decoded user in req.user
    req.user = decoded;

    const { method } = req;

    (async function handleRequest() {
      try {
        const { db } = await connectToDatabase();

        if (method === "GET") {
          const { id } = req.user;
          const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          return res.status(200).json({
            user: {
              name: user.name,
              email: user.email,
              location: user.location,
              preferences: user.preferences,
            },
          });
        }

        if (method === "PUT") {
          const { id } = req.user;
          const { name, location, preferences } = req.body;

          const updatedUser = await db.collection("users").findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
              $set: {
                name: name || null,
                location: location || null,
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

        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).json({ message: `Method ${method} not allowed` });
      } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    })();
  });
}
