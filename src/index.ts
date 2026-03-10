import express, { Request, Response } from "express";
import images from "./routes/api/images";

const app = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Server running");
});

app.use("/api/images", images);

app.listen(port, (): void => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
