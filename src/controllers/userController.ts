import { Request, Response } from "express";
import { registerUser } from "../business/userBusiness.js";

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  try {
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  res.send("User logged in");
}
