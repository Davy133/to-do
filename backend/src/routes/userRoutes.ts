import { Router } from "express";
import { createUserSchema, loginUserSchema, updateUserSchema } from "../schemas/userSchema";
import { validateData } from "../middleware/validation";
import { getUser, createUser, loginUser, updateUser, getGravatar } from "../controllers/userController";
import auth from "../middleware/auth";
const userRouter: Router = Router();

/**
 * @route   GET /api/user
 * @desc    Get the authenticated user's profile
 * @access  Private (Requires authentication)
 * @returns {Object} User profile details (name, email, age, gender, profile picture, etc.)
 */
userRouter.get("/user", auth.required, getUser);

/**
 * @route   POST /api/user
 * @desc    Register a new user
 * @access  Public
 * @param   {string} name - Full name of the user
 * @param   {string} gender - Gender of the user
 * @param   {number} age - Age of the user
 * @param   {string} email - User's email address (must be unique)
 * @param   {string} password - User's password
 * @returns {Object} Created user profile (excluding password)
 */
userRouter.post("/user", validateData(createUserSchema), createUser);

/**
 * @route   POST /api/user/login
 * @desc    Authenticate user and return a token
 * @access  Public
 * @param   {string} email - User's email
 * @param   {string} password - User's password
 * @returns {Object} Authentication token and user details
 */
userRouter.post("/user/login", validateData(loginUserSchema), loginUser);

/**
 * @route   PUT /api/user
 * @desc    Update user profile (name, age, profile picture)
 * @access  Private (Requires authentication)
 * @param   {string} name - Updated full name (optional)
 * @param   {number} age - Updated age (optional)
 * @param   {string} profilePicture - URL of the updated profile picture (optional)
 * @returns {Object} Updated user profile
 */
userRouter.put("/user", auth.required, validateData(updateUserSchema), updateUser);

userRouter.get("/user/profile", auth.required, getGravatar);

export const UsersRoutes: Router = userRouter;
