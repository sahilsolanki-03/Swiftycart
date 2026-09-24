import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/db.js";

import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SwiftyCart API is running",
  });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/admin", adminRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`SwiftyCart server is running on port ${PORT}`);
});