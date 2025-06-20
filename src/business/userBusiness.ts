import bcryptjs from "bcryptjs";
import { createUser, findByEmail } from "../repository/userRepository.js";
import jwt from "jsonwebtoken";

export async function registerUser(name: string, email: string, password: string): Promise<any> {
  try {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    let existingUser = await findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    let cryptPass = await bcryptjs.hash(password, 10);
    const user = await createUser(name, email, cryptPass);

    console.log("User registered successfully:", user);
    return user;
  } catch (error: Error | any) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
}

export async function loginUser(email: string, password: string): Promise<any> {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }   

    const user = await findByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, jwtSecret as string, { expiresIn: "1h"});
    const { password: _, ...userWithoutPassword } = user;
    console.log("User logged in successfully:", userWithoutPassword);
    return token;
  } catch (error: Error | any) {
    console.error("Error logging in user:", error.message);
    throw new Error(error.message);
  }
}