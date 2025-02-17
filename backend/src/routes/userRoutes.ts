import { Router } from "express";
import { createUserSchema, loginUserSchema } from "../schemas/userSchema";
import { validateData } from "../middleware/validation";
import { getUser, createUser, loginUser } from "../controllers/userController";
import auth from "../middleware/auth";
const userRouter: Router = Router();


/**
 * GET /api/user
 */

userRouter.get("/user", auth.required, getUser);

/**
 * POST /api/user
 */

userRouter.post("/user", validateData(createUserSchema), createUser);

/**
 * POST /api/user/login
 */

userRouter.post("/user/login", validateData(loginUserSchema), loginUser);

export const UsersRoutes: Router = userRouter;
