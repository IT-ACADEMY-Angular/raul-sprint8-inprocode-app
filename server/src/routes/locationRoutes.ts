import { Router } from "express";
import { saveLocation, getLocations } from "../controllers/locationController";

const router = Router();

router.get("/", getLocations);

router.post("/", saveLocation);

export default router;
