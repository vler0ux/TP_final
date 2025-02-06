import cors from "cors";
import "dotenv/config";
import express from "express";

import { instrumentRouter } from "./router/instruments";


const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/instruments", instrumentRouter)


app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});

