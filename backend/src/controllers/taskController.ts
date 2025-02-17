import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
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

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, dueDate } = req.body;
    const user = req.auth?.user;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        user: {
          connect: { id: user?.id },
        },
      },
    });

    res.status(StatusCodes.CREATED).json(apiResponse.success(task));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;
        const user = req.auth?.user;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task || task.userId !== user?.id) {
            res.status(StatusCodes.FORBIDDEN).json(apiResponse.error("You are not authorized to update this task"));
            return;
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, dueDate: new Date(dueDate) },
        });

        res.status(StatusCodes.OK).json(apiResponse.success(updatedTask));
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.auth?.user;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task || task.userId !== user?.id) {
            res.status(StatusCodes.FORBIDDEN).json(apiResponse.error("You are not authorized to delete this task"));
            return 
        }

        await prisma.task.delete({ where: { id } });

        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export const markTaskAsCompleted = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.auth?.user;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task || task.userId !== user?.id) {
            res.status(StatusCodes.FORBIDDEN).json(apiResponse.error("You are not authorized to mark this task as completed"));
            return;
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { isCompleted: true },
        });

        res.status(StatusCodes.OK).json(apiResponse.success(updatedTask));
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.auth?.user;

    const tasks = await prisma.task.findMany({
      where: { userId: user?.id },
    });

    res.status(StatusCodes.OK).json(apiResponse.success(tasks));
  } catch (error) {
    next(error);
  }
};
