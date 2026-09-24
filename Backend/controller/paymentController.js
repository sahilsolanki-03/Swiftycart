import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";

export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, method, transactionId, status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const payment = await Payment.create({
      user: req.user._id,
      order: orderId,
      amount,
      method,
      transactionId: transactionId || "",
      status: status || "PENDING",
    });

    if (status === "SUCCESS") {
      order.paymentStatus = "PAID";
      await order.save();
    }

    return res.status(201).json({
      success: true,
      message: "Payment record created",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user._id,
    })
      .populate("order")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};