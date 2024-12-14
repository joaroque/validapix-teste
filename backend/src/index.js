import cors from "cors";
import "dotenv/config.js";
import express from "express";
import errorHandler from "./middlewares/errorHandle.js";
import router from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

// @ts-ignore
app.get("/", (req, res) => {
  return res.json({ message: "Teste técnico ValidaPix" });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
