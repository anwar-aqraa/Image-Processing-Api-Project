"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const resizeImage_1 = require("../../utilities/resizeImage");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const filename = req.query.filename;
    const widthParam = req.query.width;
    const heightParam = req.query.height;
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
    const width = parseInt(widthParam);
    const height = parseInt(heightParam);
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
    const fullImagePath = path_1.default.resolve(`assets/full/${filename}.jpg`);
    const thumbPath = path_1.default.resolve(`assets/thumb/${filename}_${width}_${height}.jpg`);
    try {
        await promises_1.default.access(fullImagePath);
    }
    catch {
        res.status(404).send("Image file does not exist");
        return;
    }
    try {
        await promises_1.default.access(thumbPath);
        res.sendFile(thumbPath);
        return;
    }
    catch {
        // thumbnail does not exist
    }
    try {
        await (0, resizeImage_1.resizeImage)(fullImagePath, thumbPath, width, height);
        res.sendFile(thumbPath);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error processing image");
    }
});
exports.default = router;
