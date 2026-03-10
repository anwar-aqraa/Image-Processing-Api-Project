import fs from "fs";
import path from "path";
import { resizeImage } from "../../utilities/resizeImage";

describe("Image Processing Utility", (): void => {
  const inputFile: string = path.join(__dirname, "../../../assets/full/fjord.jpg");
  const outputFile: string = path.join(__dirname, "../../../assets/thumb/fjord-200x200.jpg");

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  it("successfully resizes image with valid inputs", async (): Promise<void> => {
    await resizeImage(inputFile, outputFile, 200, 200);
    expect(fs.existsSync(outputFile)).toBeTrue();
  });

  it("throws an error if input file does not exist", async (): Promise<void> => {
    const invalidInput = path.join(__dirname, "../../../assets/nonexistent.jpg");
    await expectAsync(resizeImage(invalidInput, outputFile, 200, 200)).toBeRejectedWithError();
  });

  it("throws an error if width or height is invalid", async (): Promise<void> => {
    await expectAsync(resizeImage(inputFile, outputFile, -100, 200)).toBeRejectedWithError();
    await expectAsync(resizeImage(inputFile, outputFile, 200, 0)).toBeRejectedWithError();
  });
});
