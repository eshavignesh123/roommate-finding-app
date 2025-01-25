import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { senderId, receiverId, messageContent } = req.body;

  if (!senderId || !receiverId || !messageContent) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { db } = await connectToDatabase();

    const message = {
      senderId,
      receiverId,
      messageContent,
      timestamp: new Date(),
    };

    await db.collection("messages").insertOne(message);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
