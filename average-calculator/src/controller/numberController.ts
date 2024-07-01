import { Router, Request, Response } from "express";
import numberService from "../service/numberService";

const router = Router();

router.get("/:numberid", async (req: Request, res: Response) => {
  const { numberid } = req.params;

  // Logging the numberid to debug
  console.log(`Received request with numberid: ${numberid}`);

  // Ensure valid number IDs
  const validIds = ["p", "f", "e", "r"];
  if (!validIds.includes(numberid)) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  try {
    const result = await numberService.getNumbers(numberid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
