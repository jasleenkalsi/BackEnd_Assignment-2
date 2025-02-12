import request from "supertest";
import app from "../src/app";

describe("Global Error Handler", () => {
    test("Should return 404 for a non-existent branch", async () => {
        const res = await request(app).get("/api/v1/branches/999");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Branch with ID 999 not found");
    });

    test("Should return 400 for validation error", async () => {
        const res = await request(app)
            .post("/api/v1/branches")
            .send({ name: "" }); // Invalid input
        expect(res.status).toBe(400);
        expect(res.body.message).toContain("name is not allowed to be empty");
    });
});
