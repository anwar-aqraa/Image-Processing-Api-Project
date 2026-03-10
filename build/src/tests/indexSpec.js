"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("Image API Endpoint Tests", () => {
    it("returns 200 for root endpoint", async () => {
        const response = await request.get("/");
        expect(response.status).toBe(200);
    });
    it("returns 200 for a valid request", async () => {
        const response = await request.get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    });
    it("returns 400 if filename is missing", async () => {
        const response = await request.get("/api/images?width=200&height=200");
        expect(response.status).toBe(400);
    });
    it("returns 400 if width is invalid", async () => {
        const response = await request.get("/api/images?filename=fjord&width=abc&height=200");
        expect(response.status).toBe(400);
    });
    it("returns 404 if image does not exist", async () => {
        const response = await request.get("/api/images?filename=unknown&width=200&height=200");
        expect(response.status).toBe(404);
    });
});
