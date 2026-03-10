"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeimage_1 = __importDefault(require("./../../utilities/resizeimage"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const filename = req.query.filename;
    const widthParam = req.query.width;
    const heightParam = req.query.height;
    if (!filename) {
        return res.status(400).send("Filename parameter is required");
    }
    if (!widthParam) {
        return res.status(400).send("Width parameter is required");
    }
    if (!heightParam) {
        return res.status(400).send("Height parameter is required");
    }
    const width = parseInt(widthParam);
    const height = parseInt(heightParam);
    // width ليس رقم
    if (isNaN(width)) {
        return res.status(400).send("Width must be a valid number");
    }
    // height ليس رقم
    if (isNaN(height)) {
        return res.status(400).send("Height must be a valid number");
    }
    // width أصغر أو يساوي صفر
    if (width <= 0) {
        return res.status(400).send("Width must be greater than zero");
    }
    // height أصغر أو يساوي صفر
    if (height <= 0) {
        return res.status(400).send("Height must be greater than zero");
    }
    const fullImagePath = path_1.default.resolve(`assets/full/${filename}.jpg`);
    const thumbPath = path_1.default.resolve(`assets/thumb/${filename}_${width}_${height}.jpg`);
    // 5️⃣ الصورة الأصلية غير موجودة
    if (!fs_1.default.existsSync(fullImagePath)) {
        return res.status(404).send("Image file does not exist");
    }
    try {
        // 6️⃣ إذا الصورة موجودة في الكاش
        if (fs_1.default.existsSync(thumbPath)) {
            return res.sendFile(thumbPath);
        }
        // 7️⃣ إنشاء الصورة
        await (0, resizeimage_1.default)(fullImagePath, thumbPath, width, height);
        return res.sendFile(thumbPath);
    }
    catch (error) {
        return res.status(500).send("Error processing image");
    }
});
exports.default = router;
