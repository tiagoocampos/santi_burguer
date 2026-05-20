import express from "express";
import "dotenv/config";
import cors from "cors";
import { testConnection } from "./database/testConnection.js";
import { router } from "./routes/productsRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

testConnection();