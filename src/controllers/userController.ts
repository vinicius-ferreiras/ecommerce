import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log("User created:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  } finally {
    await prisma.$disconnect();
  }
}

export async function login(req: Request, res: Response) {
  res.send("User logged in");
}
