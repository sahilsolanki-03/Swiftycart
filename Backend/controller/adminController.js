import User from "../models/usermodels.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";

export const getDashboard = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, totalPayments] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        Product.countDocuments(),
        Order.countDocuments(),
        Payment.countDocuments(),
      ]);

    const revenueResult = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalPayments,
        revenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstname lastname email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "firstname lastname email")
      .populate("order")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};