"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resizeImage_1 = require("../../utilities/resizeImage");
describe("Image Processing Utility", () => {
    const inputFile = path_1.default.join(__dirname, "../../../assets/full/fjord.jpg");
    const outputFile = path_1.default.join(__dirname, "../../../assets/thumb/fjord-200x200.jpg");
    afterEach(() => {
        if (fs_1.default.existsSync(outputFile)) {
            fs_1.default.unlinkSync(outputFile);
        }
    });
    it("successfully resizes image with valid inputs", async () => {
        await (0, resizeImage_1.resizeImage)(inputFile, outputFile, 200, 200);
        expect(fs_1.default.existsSync(outputFile)).toBeTrue();
    });
    it("throws an error if input file does not exist", async () => {
        const invalidInput = path_1.default.join(__dirname, "../../../assets/nonexistent.jpg");
        await expectAsync((0, resizeImage_1.resizeImage)(invalidInput, outputFile, 200, 200)).toBeRejectedWithError();
    });
    it("throws an error if width or height is invalid", async () => {
        await expectAsync((0, resizeImage_1.resizeImage)(inputFile, outputFile, -100, 200)).toBeRejectedWithError();
        await expectAsync((0, resizeImage_1.resizeImage)(inputFile, outputFile, 200, 0)).toBeRejectedWithError();
    });
});
