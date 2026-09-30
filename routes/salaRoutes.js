import express from "express";
import salaController from "../controllers/salaController.js";

const router = express.Router();

router.get("/", salaController.list);
router.get("/:id", salaController.getOne);
router.post("/", salaController.create);
router.put("/:id", salaController.update);
router.patch("/:id", salaController.update);
router.delete("/:id", salaController.remove);

export default router;
