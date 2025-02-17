import { Router } from "express";
import { UsersRoutes } from "./userRoutes";
import { TasksRoutes } from "./taskRoutes";

const router: Router = Router();

router.use("/", UsersRoutes);
router.use("/", TasksRoutes);

export const MainRouter: Router = router;
