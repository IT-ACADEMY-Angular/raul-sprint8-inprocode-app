import { Router } from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);


export default router;
