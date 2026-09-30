import express from "express";
import utilizatorController from "../controllers/utilizatorController.js";

const router = express.Router();

router.get("/", utilizatorController.list);
router.get("/:id", utilizatorController.getOne);
router.post("/", utilizatorController.create);
router.put("/:id", utilizatorController.update);
router.patch("/:id", utilizatorController.update);
router.delete("/:id", utilizatorController.remove);

export default router;
