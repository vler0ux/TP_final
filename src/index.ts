import cors from "cors";
import "dotenv/config";
import express from "express";

import { instrumentRouter } from "./router/instruments";
import { userRouter } from "./router/users";
import { reparationRouter } from "./router/reparations";


const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/instruments", instrumentRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/reparations", reparationRouter)


app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});

