import request from "supertest";
import app from "../src/app";
import axios from "axios";

jest.mock("axios");

describe("GET /numbers/:numberid", () => {
  const mockResponse = (type: string) => {
    switch (type) {
      case "p":
        return { data: { numbers: [2, 3, 5, 7, 11] } };
      case "f":
        return { data: { numbers: [1, 1, 2, 3, 5, 8, 13] } };
      case "e":
        return { data: { numbers: [2, 4, 6, 8, 10] } };
      case "r":
        return { data: { numbers: [1, 3, 5, 7, 9] } };
      default:
        return { data: { numbers: [] } };
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the numbers and their average for even numbers", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse("e"));

    const res = await request(app).get("/numbers/e");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("windowPrevState");
    expect(res.body).toHaveProperty("windowCurrState");
    expect(res.body).toHaveProperty("numbers");
    expect(res.body).toHaveProperty("avg");
    expect(res.body.numbers).toEqual([2, 4, 6, 8, 10]);
    expect(res.body.avg).toBe(6.0);
  });

  it("should return 400 for invalid number ID", async () => {
    const res = await request(app).get("/numbers/invalid");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Invalid number ID");
  });

  it("should return 500 for server error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

    const res = await request(app).get("/numbers/e");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Error fetching numbers or processing data");
  });
});
