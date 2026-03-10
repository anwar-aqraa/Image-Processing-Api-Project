import sharp from "sharp";
import fs from "fs";

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> => {
  if (!fs.existsSync(inputPath)) {
    throw new Error("Input file does not exist");
  }
  if (width <= 0 || height <= 0) {
    throw new Error("Width and height must be positive numbers");
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
};
