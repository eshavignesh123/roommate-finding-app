import { connectToDatabase } from "../../../lib/mongodb";
import authMiddleware from "../../../utils/authMiddleware";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  authMiddleware(req, res, async () => {
    const { method } = req;

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
  });
}
