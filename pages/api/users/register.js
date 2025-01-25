import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const contentType = req.headers["content-type"];
  let body = {};

  if (contentType === "application/json") {
    body = req.body;
  } else if (contentType === "application/x-www-form-urlencoded") {
    body = Object.fromEntries(new URLSearchParams(req.body).entries());
  } else {
    return res.status(400).json({ message: "Unsupported content type" });
  }

  const { first_name, last_name, email, password } = body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
