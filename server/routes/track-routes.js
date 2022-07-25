const express = require("express");
const { check } = require("express-validator");

const trackControllers = require("../controllers/track-controllers");
const router = express.Router();

router.post(
  "/add",
  [
    check("orderId").not().isEmpty(),
    check("statusCountry").not().isEmpty(),
    check("statusDescription").not().isEmpty(),
  ],
  trackControllers.addOrderStatus
);

router.get("/:orderId", [], trackControllers.getOrderStatusByOrderId);
router.delete("/delete/:orderStatusId", [], trackControllers.removeOrderStatus);

router.post(
  "/search",
  [check("searchOrder").not().isEmpty()],
  trackControllers.searchOrder
);

module.exports = router;
