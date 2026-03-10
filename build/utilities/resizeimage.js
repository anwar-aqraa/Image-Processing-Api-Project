"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resizeImage = async (inputPath, outputPath, width, height) => {
    if (!fs_1.default.existsSync(inputPath)) {
        throw new Error("Input file does not exist");
    }
    if (width <= 0 || height <= 0) {
        throw new Error("Width and height must be positive numbers");
    }
    await (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
};
exports.resizeImage = resizeImage;
