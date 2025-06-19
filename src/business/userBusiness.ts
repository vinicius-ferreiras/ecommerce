import bcryptjs from "bcryptjs";
import { createUser, userExists } from "../repository/userRepository.js";

export async function registerUser(name: string, email: string, password: string): Promise<any> {
  try {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    if (await userExists(email)) {
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