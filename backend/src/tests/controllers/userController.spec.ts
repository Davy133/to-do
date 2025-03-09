import { prismaMock } from "../../singleton";
import { getUser, createUser, loginUser, updateUser } from "../../controllers/userController";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token";
import { apiResponse } from "../../utils/apiResponse";
describe("User Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("getUser", () => {
        it("should return 401 if user is not authenticated", async () => {
            req.auth = undefined;

            await getUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "Unauthorized" }));
        });

        it("should return 404 if user is not found", async () => {
            req.auth = { user: { id: "1" } };
            prismaMock.user.findUnique.mockResolvedValue(null);

            await getUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "User not found" }));
        });

        it("should return user data if user is found", async () => {
            req.auth = { user: { id: "1" } };
            const user = { id: "1", email: "test@test.com", name: "Test User", gender: "male", age: 30, password: "hashedPassword", createdAt: new Date(), updatedAt: new Date() };
            prismaMock.user.findUnique.mockResolvedValue(user);

            await getUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success(user));
        });
    });

    describe("createUser", () => {
        it("should return 400 if passwords do not match", async () => {
            req.body = { password: "password", confirmPassword: "differentPassword" };

            await createUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "Passwords do not match" }));
        });

        it("should create a new user and return 201", async () => {
            req.body = { email: "test@test.com", name: "Test User", password: "password", confirmPassword: "password", gender: "male", age: 30 };
            const hashedPassword = await bcrypt.hash("password", 10);
            const user = { id: "1", email: "test@test.com", name: "Test User", gender: "male", age: 30, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() };
            prismaMock.user.create.mockResolvedValue(user);

            await createUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success(user));
        });
    });

    describe("loginUser", () => {
        it("should return 401 if user is not found", async () => {
            req.body = { email: "test@test.com", password: "password" };
            prismaMock.user.findUnique.mockResolvedValue(null);

            await loginUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "Invalid email or password" }));
        });

        it("should return 401 if password is invalid", async () => {
            req.body = { email: "test@test.com", password: "password" };
            const user = { id: "1", email: "test@test.com", password: await bcrypt.hash("differentPassword", 10), name: "Test User", gender: "male", age: 30, createdAt: new Date(), updatedAt: new Date() };
            prismaMock.user.findUnique.mockResolvedValue(user);

            await loginUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "Invalid email or password" }));
        });

        it("should return user data and token if login is successful", async () => {
            req.body = { email: "test@test.com", password: "password" };
            const user = { id: "1", email: "test@test.com", password: await bcrypt.hash("password", 10), name: "Test User", gender: "male", age: 30, createdAt: new Date(), updatedAt: new Date() };
            prismaMock.user.findUnique.mockResolvedValue(user);
            const token = generateToken(user.id);

            await loginUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith({
            name: user.name,
            email: user.email,
            token,
            createdAt: user.createdAt,
            });
            expect(token).not.toBeNull();
        });
    });

    describe("updateUser", () => {
        it("should return 401 if user is not authenticated", async () => {
            req.auth = undefined;

            await updateUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.fail({ message: "Unauthorized" }));
        });

        it("should update user data and return 200", async () => {
            req.auth = { user: { id: "1" } };
            req.body = { email: "updated@test.com", name: "Updated User", gender: "female", age: 25 };
            const updatedUser = { id: "1", email: "updated@test.com", name: "Updated User", gender: "female", age: 25, password: "hashedPassword", createdAt: new Date(), updatedAt: new Date() };
            prismaMock.user.update.mockResolvedValue(updatedUser);

            await updateUser(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success(updatedUser));
        });
    });
});

