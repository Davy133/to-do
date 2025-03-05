import { createTask, updateTask, deleteTask, markTaskAsCompleted, getTasks } from "../../controllers/taskController";
import { prismaMock } from "../../singleton";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../../utils/apiResponse";



describe("Task Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            auth: { user: { id: "userId" } },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    describe("createTask", () => {
        it("should create a task", async () => {
            req.body = { title: "Test Task", description: "Test Description", dueDate: "2023-10-10" };
            const date: Date = new Date("2023-10-10");
            prismaMock.task.create.mockResolvedValue({
                id: "taskId",
                title: "Test Task",
                description: "Test Description",
                dueDate: date,
                userId: "userId",
                isCompleted: false,
                createdAt: date,
                updatedAt: date
            });

            await createTask(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success({
                id: "taskId",
                title: "Test Task",
                description: "Test Description",
                isCompleted: false,
                dueDate: date,
                createdAt: date,
                updatedAt: date,
                userId: "userId",
            }));
        });
    });

    describe("updateTask", () => {
        it("should update a task", async () => {
            req.params = { id: "taskId" };
            req.body = { title: "Updated Task", description: "Updated Description", dueDate: "2023-11-11" };

            prismaMock.task.findUnique.mockResolvedValue({
                id: "taskId",
                userId: "userId",
                title: "",
                description: null,
                dueDate: new Date("2023-10-10"),
                isCompleted: false,
                createdAt: new Date("2023-10-10"),
                updatedAt: new Date("2023-10-10")
            });

            prismaMock.task.update.mockResolvedValue({
                id: "taskId",
                title: "Updated Task",
                description: "Updated Description",
                dueDate: new Date("2023-11-11"),
                userId: "userId",
                isCompleted: false,
                createdAt: new Date("2023-10-10"),
                updatedAt: new Date("2023-10-10")
            });

            await updateTask(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success({
                id: "taskId",
                title: "Updated Task",
                description: "Updated Description",
                dueDate: new Date("2023-11-11"),
                isCompleted: false,
                createdAt: new Date("2023-10-10"),
                updatedAt: new Date("2023-10-10"),
                
                userId: "userId",
            }));
        });
    });

    describe("deleteTask", () => {
        it("should delete a task", async () => {
            req.params = { id: "taskId" };

            prismaMock.task.findUnique.mockResolvedValue({
                id: "taskId",
                userId: "userId",
                title: "",
                description: null,
                dueDate: new Date(),
                isCompleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // prismaMock.task.delete.mockResolvedValue({
            //     userId: "",
            //     id: "",
            //     title: "",
            //     description: null,
            //     dueDate: undefined,
            //     isCompleted: false,
            //     createdAt: undefined,
            //     updatedAt: undefined
            // });

            await deleteTask(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe("markTaskAsCompleted", () => {
        it("should mark a task as completed", async () => {
            req.params = { id: "taskId" };

            prismaMock.task.findUnique.mockResolvedValue({
                id: "taskId",
                userId: "userId",
                title: "",
                description: null,
                dueDate: new Date("2023-10-10"),
                isCompleted: false,
                createdAt:  new Date("2023-10-10"),
                updatedAt:  new Date("2023-10-10")
            });

            prismaMock.task.update.mockResolvedValue({
                id: "taskId",
                isCompleted: true,
                userId: "userId",
                title: "",
                description: null,
                dueDate:  new Date("2023-10-10"),
                createdAt:  new Date("2023-10-10"),
                updatedAt:  new Date("2023-10-10")
            });

            await markTaskAsCompleted(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success({
                id: "taskId",
                isCompleted: true,
                userId: "userId",
                title: "",
                description: null,
                dueDate: new Date("2023-10-10"),
                createdAt: new Date("2023-10-10"),
                updatedAt: new Date("2023-10-10")


            }));
        });
    });

    describe("getTasks", () => {
        it("should get tasks for the user", async () => {
            prismaMock.task.findMany.mockResolvedValue([
                {
                    id: "taskId1",
                    title: "Task 1",
                    description: "Description 1",
                    dueDate: new Date("2023-10-10"),
                    userId: "userId",
                    isCompleted: false,
                    createdAt: new Date("2023-10-10"),
                    updatedAt: new Date("2023-10-10")
                },
                {
                    id: "taskId2",
                    title: "Task 2",
                    description: "Description 2",
                    dueDate: new Date("2023-11-11"),
                    userId: "userId",
                    isCompleted: false,
                    createdAt: new Date("2023-10-10"),
                    updatedAt: new Date("2023-10-10")
                },
            ]);

            await getTasks(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(apiResponse.success([
                {
                    id: "taskId1",
                    title: "Task 1",
                    description: "Description 1",
                    createdAt: new Date("2023-10-10"),
                    updatedAt: new Date("2023-10-10"),
                    isCompleted: false,
                    dueDate: new Date("2023-10-10"),
                    userId: "userId",
                },
                {
                    id: "taskId2",
                    title: "Task 2",
                    description: "Description 2",
                    createdAt: new Date("2023-10-10"),
                    updatedAt: new Date("2023-10-10"),
                    isCompleted: false,
                    dueDate: new Date("2023-11-11"),
                    userId: "userId",
                },
            ]));
        });
    });
});
