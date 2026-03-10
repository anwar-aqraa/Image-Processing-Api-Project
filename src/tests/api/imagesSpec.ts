import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

describe("Image API Endpoint Tests", (): void => {
  it("returns 200 for root endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("returns 200 for a valid image request", async (): Promise<void> => {
    const response = await request.get("/api/images?filename=fjord&width=200&height=200");

    expect(response.status).toBe(200);
  });

  it("returns 400 if filename is missing", async (): Promise<void> => {
    const response = await request.get("/api/images?width=200&height=200");

    expect(response.status).toBe(400);
  });

  it("returns 400 if width is invalid", async (): Promise<void> => {
    const response = await request.get("/api/images?filename=fjord&width=abc&height=200");

    expect(response.status).toBe(400);
  });

  it("returns 400 if height is missing", async (): Promise<void> => {
    const response = await request.get("/api/images?filename=fjord&width=200");
    expect(response.status).toBe(400);
  });

  it("returns 404 if image does not exist", async (): Promise<void> => {
    const response = await request.get("/api/images?filename=unknown&width=200&height=200");

    expect(response.status).toBe(404);
  });
});
