import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import { apiResponse } from '../utils/apiResponse';

//TODO: Improve this
declare module 'express' {
  export interface Request {
    auth?: {
      user: {
        id: string;
      };
    };
  }
}

export const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.auth?.user.id.toString(),
    },
    select: {
      id: true,
      email: true,
    }
  });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json(apiResponse.fail({ message: 'User not found' }));
    return;
  }

  res.status(StatusCodes.OK).json(apiResponse.success(user));
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password, gender, age } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      gender,
      age
    }
    });
    res.status(StatusCodes.CREATED).json(apiResponse.success({
      id: user.id,
      email: user.email,
    }));
}

export const loginUser = async (req: Request, res: Response): Promise <void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }, select: {
      id: true,
      password: true,
      email: true,
      name: true,
      createdAt: true
    }
  });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json(apiResponse.fail({ message: 'Invalid email or password' }));
    return;
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(StatusCodes.UNAUTHORIZED).json(apiResponse.fail({ message: 'Invalid email or password' }));
    return;
  }

  res.status(StatusCodes.OK).json({ 
    name: user.name,
    email: user.email,
    token:  generateToken(user.id),
    createdAt: user.createdAt
  });
}
 