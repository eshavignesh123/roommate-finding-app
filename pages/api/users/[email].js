// pages/api/users/[email].js

import { connectToDatabase } from '../../../lib/mongodb';


export default async function handler(req, res) {
  const { email } = req.query; // Extract email from URL parameter

  if (req.method === "GET") {
    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Query the database for the user with the specified email
      const user = await db.collection('users').findOne({ email });

      // If user is not found, return a 404 error
      if (!user) {
        return res.status(404).json({ error: "User not found blah blah" });
      }

      // Return the user profile
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any non-GET methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
