import { Router } from "express";
import { getChartData, createChartData } from "../controllers/chartController";

const router = Router();

router.get("/", getChartData);
router.post("/", createChartData);

export default router;