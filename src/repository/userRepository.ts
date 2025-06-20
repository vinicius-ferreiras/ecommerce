import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findByEmail(email: string): Promise<any> {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    throw new Error("User existence check failed");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUser(name: string, email: string, password: string): Promise<any> {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error("User creation failed");
  } finally {
    await prisma.$disconnect();
  }
}