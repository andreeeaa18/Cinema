import express from "express";
import proiectieController from "../controllers/proiectieController.js";

const router = express.Router();

router.get("/", proiectieController.list);
router.get("/:id", proiectieController.getOne);
router.post("/", proiectieController.create);
router.put("/:id", proiectieController.update);
router.patch("/:id", proiectieController.update);
router.delete("/:id", proiectieController.remove);

export default router;
