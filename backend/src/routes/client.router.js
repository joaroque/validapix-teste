import { Router } from "express";
import {
  addPixController,
  createClientController,
  listTransactionsController,
} from "../controllers/client.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js";
import validateData from "../middlewares/validate-data.middleware.js";

const clientRouter = Router();

clientRouter.get("/pix/", verifyToken, listTransactionsController);
clientRouter.post("/", createClientController);
clientRouter.post("/pix/", validateData, verifyToken, addPixController);

export default clientRouter;
