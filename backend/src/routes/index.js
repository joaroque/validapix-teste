import { Router } from "express";
import authRotes from "./auth.router.js";
import clientRoutes from "./client.router.js";

const router = Router();

router.use("/", authRotes);
router.use("/clients", clientRoutes);

export default router;
