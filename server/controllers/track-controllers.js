const jwt = require("jsonwebtoken");
const db = require("../connection");
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const TYPES = require("tedious").TYPES;

const addOrderStatus = async (req, res, next) => {
  const { orderId, statusCountry, statusDescription } = req.body;
  let query = `INSERT INTO OrderStatus(orderId, statusCountry, statusDescription) VALUES('${orderId}', '${statusCountry}', '${statusDescription}');`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length === 0) {
      const error = new HttpError(
        "Failed adding new status. Something went wrong.",
        402
      );
      return next(error);
    } else {
      let lastInsertItemQuery = "SELECT * FROM `OrderStatus` WHERE orderStatusId = '" + result.insertId + "';";
      db.query(lastInsertItemQuery, (err3, lastInsertItemResult) => {
        if (err3) throw err3;
        if (lastInsertItemResult?.length <= 0) {
          const error = new HttpError(
            "Something went wrong while adding new order status. Please try again later.",
            402
          );
          return next(error);
        } else return res.json(lastInsertItemResult);
      });
    }
  });
};

const getOrderStatusByOrderId = (req, res, next) => {
  const { orderId } = req.params;
  console.log(JSON.stringify(orderId));
  let query = "SELECT * FROM `OrderStatus` WHERE orderId = '" + orderId + "';";

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length < 0) {
      const error = new HttpError(
        "Failed to retrieve the order status. Please try again later.",
        402
      );
      return next(error);
    } else if (result?.length === 0) {
      const error = new HttpError(
        "There are no order status found for Order ID: " + orderId,
        404
      );
      return next(error);
    } else return res.status(200).json(result);
  });
};

const removeOrderStatus = (req, res, next) => {
  const { orderStatusId } = req.params;
  let query =
    "DELETE FROM `OrderStatus` WHERE orderStatusId = " + orderStatusId + ";";
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length <= 0) {
      const error = new HttpError(
        "Failed to delete the order status. Please try again later.",
        402
      );
      return next(error);
    } else return res.status(200).json("Successfully delete order status.");
  });
};

const searchOrder = async (req, res, next) => {
  const { orderId } = req.body;
  let query = `SELECT * FROM Order o INNER JOIN OrderStatus s ON s.orderId = o.orderId WHERE orderId = '${orderId}';`;

  try {
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result === null || result.length === 0) {
        const error = new HttpError(
          "Order ID entered are not found. Please try again later.",
          404
        );
        return next(error);
      } else return res.status(200).json(result);
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the order ID.",
      500
    );
    return next(error);
  }
};

exports.addOrderStatus = addOrderStatus;
exports.getOrderStatusByOrderId = getOrderStatusByOrderId;
exports.removeOrderStatus = removeOrderStatus;
exports.searchOrder = searchOrder;
