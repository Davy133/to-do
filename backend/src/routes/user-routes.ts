import { z } from "zod";
import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

/**
 * GET /api/user
 */

router.get("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/user
 */

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

router.post("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = createUserSchema.parse(req.body);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        gender: "not specified", // or any default value
        age: 0, // or any default value
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export const UsersRoutes: Router = router;
