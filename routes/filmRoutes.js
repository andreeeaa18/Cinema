import express from "express";
import filmController from "../controllers/filmController.js";

const router = express.Router();

router.get("/", filmController.list);
router.get("/:id", filmController.getOne);
router.post("/", filmController.create);
router.put("/:id", filmController.update);
router.patch("/:id", filmController.update);
router.delete("/:id", filmController.remove);

export default router;
