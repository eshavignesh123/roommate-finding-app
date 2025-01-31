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
          if (req.user && req.user.id) {
            // If an ID is provided, return a single user
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
                preferences: user.preferences,
                match: user.match
              },
            });
          } else {
            // If no ID is provided, return all users
            const users = await db.collection("users").find({}).toArray();

            return res.status(200).json({
              users: users.map(user => ({
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
                matches: user.matches
              })),
            });
          }
        }

        if (method === "PUT") {
          const { id } = req.user;
          const { pronouns, location, first, second, third, fourth, fifth, preferences, match } = req.body;

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
                match: match || []
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
        
        if (method === "PATCH") {
          const { id } = req.user;
          const { match } = req.body;
        
          const userId = new ObjectId(id);
          console.log("Updating user with id:", userId);
        
          const user = await db.collection("users").findOne({ _id: userId });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          if (!Array.isArray(user.match)) {
            await db.collection("users").updateOne(
              { _id: userId },
              { $set: { match: [] } }
            );
          }
        
          // Perform the update with $push
          const updatedUser = await db.collection("users").findOneAndUpdate(
            { _id: userId },
            { $push: { match: match } },
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
        
        
        

        res.setHeader("Allow", ["GET", "PUT", "PATCH"]);
        return res.status(405).json({ message: `Method ${method} not allowed` });
      } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    })();
  });
}
