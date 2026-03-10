"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = async (inputPath, outputPath, width, height) => {
    await (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(outputPath);
};
exports.default = resizeImage;
