import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
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

      return res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const { db } = await connectToDatabase();

      const messages = await db
        .collection("messages")
        .find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .sort({ timestamp: 1 }) // Sort messages by timestamp
        .toArray();

      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
