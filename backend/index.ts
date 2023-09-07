import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/note.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/v1/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server is running");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
