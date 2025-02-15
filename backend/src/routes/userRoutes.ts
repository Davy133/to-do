import { z } from "zod";
import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createUserSchema, loginUserSchema } from "../schemas/userSchema";
import { validateData } from "../middleware/validationMiddleware";
import { getUsers, createUser, loginUser } from "../controllers/userController";

const prisma = new PrismaClient();
const userRouter: Router = Router();

/**
 * GET /api/user
 */

userRouter.get("/user", getUsers);

/**
 * POST /api/user
 */

userRouter.post("/user", validateData(createUserSchema), createUser);

/**
 * POST /api/user/login
 */

userRouter.post("/user/login", validateData(loginUserSchema), loginUser);

export const UsersRoutes: Router = userRouter;
