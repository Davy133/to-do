import { Router } from "express";
import { UsersRoutes } from "./userRoutes";

const router: Router = Router();

router.use("/", UsersRoutes);

export const MainRouter: Router = router;
