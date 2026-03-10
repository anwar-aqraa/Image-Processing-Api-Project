import express, { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { resizeImage } from "../../utilities/resizeImage";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query.filename as string;
  const widthParam: string = req.query.width as string;
  const heightParam: string = req.query.height as string;

  if (!filename) {
    res.status(400).send("Filename parameter is required");
    return;
  }

  if (!widthParam) {
    res.status(400).send("Width parameter is required");
    return;
  }

  if (!heightParam) {
    res.status(400).send("Height parameter is required");
    return;
  }

  const width: number = parseInt(widthParam);
  const height: number = parseInt(heightParam);

  if (isNaN(width)) {
    res.status(400).send("Width must be a valid number");
    return;
  }

  if (isNaN(height)) {
    res.status(400).send("Height must be a valid number");
    return;
  }

  if (width <= 0) {
    res.status(400).send("Width must be greater than zero");
    return;
  }

  if (height <= 0) {
    res.status(400).send("Height must be greater than zero");
    return;
  }

  const fullImagePath: string = path.resolve(`assets/full/${filename}.jpg`);
  const thumbPath: string = path.resolve(`assets/thumb/${filename}_${width}_${height}.jpg`);

  try {
    await fs.access(fullImagePath);
  } catch {
    res.status(404).send("Image file does not exist");
    return;
  }

  try {
    await fs.access(thumbPath);
    res.sendFile(thumbPath);
    return;
  } catch {
    // thumbnail does not exist
  }

  try {
    await resizeImage(fullImagePath, thumbPath, width, height);
    res.sendFile(thumbPath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing image");
  }
});

export default router;
