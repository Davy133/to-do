import { z } from "zod";

const taskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().optional(),
    completed: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date()
});

const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.coerce.date()
});

const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.coerce.date().optional(),
});

const markTaskAsCompletedSchema = z.object({
    completed: z.boolean(),
});

const deleteTaskSchema = z.object({
    id: z.string().uuid(),
});

export { taskSchema, createTaskSchema, updateTaskSchema, markTaskAsCompletedSchema, deleteTaskSchema};