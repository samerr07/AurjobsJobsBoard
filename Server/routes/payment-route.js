import { Create_Order, Verify_Payment } from "../controllers/payment-gateway.js";
import { Router } from "express";
import { verifyToken } from "../middleware/employer-auth.js";

const router = Router();

router.post("/create_order", verifyToken, Create_Order);
router.post("/verify_payment", verifyToken, Verify_Payment);
export default router;