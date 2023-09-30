import express from "express";
import { getPromo, getPromoById, savePromo, updatePromo, deletePromo } from "../controllers/PromoController.js";

const router = express.Router();

router.get("/Promo", getPromo);
router.get("/Promo/:id", getPromoById);
router.post("/Promo", savePromo);
router.patch("/Promo/:id", updatePromo);
router.delete("/Promo/:id", deletePromo);

export default router;
