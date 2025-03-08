import { Router } from "express";
import {
  taskSchema,
  createTaskSchema,
  deleteTaskSchema,
  markTaskAsCompletedSchema,
  updateTaskSchema,
} from "../schemas/taskSchemas";
import {
  createTask,
  updateTask,
  deleteTask,
  flipTaskStatus,
  getTasks,
} from "../controllers/taskController";
import { validateData } from "../middleware/validation";
import auth from "../middleware/auth";

const router = Router();

/**
 * POST /tasks
 * @summary Create a new task
 * @description This route is used to create a new task.
 * @tags Tasks
 * @param {Request} req - The request object containing task details.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.post("/tasks", auth.required, validateData(createTaskSchema), createTask);

/**
 * PUT /tasks/:id
 * @summary Update an existing task
 * @description This route is used to update an existing task by its ID.
 * @tags Tasks
 * @param {Request} req - The request object containing updated task details.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.put("/tasks/:id", auth.required, validateData(updateTaskSchema), updateTask);

/**
 * DELETE /tasks/:id
 * @summary Delete a task
 * @description This route is used to delete a task by its ID.
 * @tags Tasks
 * @param {Request} req - The request object containing the task ID.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.delete("/tasks/:id", auth.required, 
  // validateData(deleteTaskSchema), //TODO: Fix this
  deleteTask);

/**
 * PATCH /tasks/:id/completed
 * @summary Mark a task as completed
 * @description This route is used to mark a task as completed by its ID.
 * @tags Tasks
 * @param {Request} req - The request object containing the task ID.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.patch(
  "/tasks/:id/completed",
  auth.required,
  // validateData(markTaskAsCompletedSchema),
  flipTaskStatus
);

/**
 * GET /tasks
 * @summary Get all tasks
 * @description This route is used to retrieve all tasks.
 * @tags Tasks
 * @param {Request} req - The request object.
 * @param {Response} res - The response object containing the list of tasks.
 * @returns {void}
 */

router.get("/tasks", auth.required, getTasks);

export const TasksRoutes: Router = router;
