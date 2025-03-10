import razorpayInstance from "../config/razorpay.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";


// Route to handle order creation
export const Create_Order = async(req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            receipt,
            notes,
        };

        const order = await razorpayInstance.orders.create(options);

        res.json(order); // Send order details to frontend
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
};

// Route to handle payment verification
export const Verify_Payment = async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    try {
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if (isValidSignature) {
            res.status(200).json({ status: "ok" });
            console.log("Payment verification successful");
        } else {
            res.status(400).json({ status: "verification_failed" });
            console.log("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error verifying payment" });
    }
};