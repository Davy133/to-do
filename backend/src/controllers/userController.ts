import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";
import { apiResponse } from "../utils/apiResponse";

declare module "express" {
  export interface Request {
    auth?: {
      user: {
        id: string;
      };
    };
  }
}

export const prisma = new PrismaClient();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.user.id) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(apiResponse.fail({ message: "Unauthorized" }));
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.auth.user.id },
      select: { id: true, email: true },
    });

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(apiResponse.fail({ message: "User not found" }));
      return;
    }

    res.status(StatusCodes.OK).json(apiResponse.success(user));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name, password, gender, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, gender, age },
    });

    res.status(StatusCodes.CREATED).json(apiResponse.success(user));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(apiResponse.fail({ message: "Invalid email or password" }));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(apiResponse.fail({ message: "Invalid email or password" }));
      return;
    }

    res.status(StatusCodes.OK).json({
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.user.id) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(apiResponse.fail({ message: "Unauthorized" }));
      return;
    }

    const { email, name, gender, age } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.auth.user.id },
      data: { email, name, gender, age },
      select: { id: true, email: true, name: true, gender: true, age: true },
    });

    res.status(StatusCodes.OK).json(apiResponse.success(updatedUser));
  } catch (error) {
    next(error);
  }
};
