import cors from "cors";
import "dotenv/config";
import express from 'express';
import {router} from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT= process.env.PORT! || 3333;

app.use(router);

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})