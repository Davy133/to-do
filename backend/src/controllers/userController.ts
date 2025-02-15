import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password, gender, age } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      gender,
      age
    }
    });
    res.status(StatusCodes.CREATED).json(user);
}

export const loginUser = async (req: Request, res: Response): Promise <void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
}
