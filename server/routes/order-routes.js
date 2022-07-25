const express = require("express");
const { check } = require("express-validator");

const orderControllers = require("../controllers/order-controllers");
const router = express.Router();

router.post(
  "/create",
  [check("orderId").not().isEmpty(), check("orderStatus").not().isEmpty()],
  orderControllers.createOrder
);

router.get("/", [], orderControllers.getOrders);

router.post(
  "/update",
  [check("orderId").not().isEmpty(), check("orderStatus").not().isEmpty()],
  orderControllers.updateOrder
);

router.delete(
  "/delete/:orderId",
  [],
  orderControllers.deleteOrder
);

module.exports = router;
