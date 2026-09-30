import express from "express";
import rezervareController from "../controllers/rezervareController.js";

const router = express.Router();

router.get("/", rezervareController.list);
router.get("/:id", rezervareController.getOne);
router.post("/", rezervareController.create);
router.put("/:id", rezervareController.update);
router.patch("/:id", rezervareController.update);
router.delete("/:id", rezervareController.remove);

export default router;
