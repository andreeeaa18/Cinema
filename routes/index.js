import express from "express";
import filmRoutes from "./filmRoutes.js";
import salaRoutes from "./salaRoutes.js";
import utilizatorRoutes from "./utilizatorRoutes.js";
import proiectieRoutes from "./proiectieRoutes.js";
import rezervareRoutes from "./rezervareRoutes.js";

const router = express.Router();

router.use("/filme", filmRoutes);
router.use("/sali", salaRoutes);
router.use("/utilizatori", utilizatorRoutes);
router.use("/proiectii", proiectieRoutes);
router.use("/rezervari", rezervareRoutes);

export default router;
