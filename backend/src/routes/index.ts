import { Router } from "express";
import { UsersRoutes } from "./user-routes";

const router: Router = Router();

router.use("/", UsersRoutes);

export const MainRouter: Router = router;