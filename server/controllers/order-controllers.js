const jwt = require("jsonwebtoken");
const db = require("../connection");
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const TYPES = require("tedious").TYPES;

const createOrder = async (req, res, next) => {
  const { orderId, orderStatus } = req.body;
  let query = `INSERT INTO Order(orderId, orderStatus) VALUES('${orderId}', '${orderStatus}') `;

  try {
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result?.length === 0) {
        const error = new HttpError(
          "Failed creating new order. Please try again later.",
          402
        );
        return next(error);
      } else {
        let retrieveQuery = `SELECT FROM Order WHERE orderId = '${orderId}'`;
        db.query(retrieveQuery, (errRetrieve, retrieveResult) => {
          if (err) throw err;
          if (retrieveResult?.length === 0) {
            const error = new HttpError(
              "Failed creating new order. Something went wrong.",
              402
            );
            return next(error);
          } else return res.json(retrieveResult);
        });
      }
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create the order.",
      500
    );
    return next(error);
  }
};

const getOrders = (req, res, next) => {
  let query = "SELECT * FROM `Order`;";
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length < 0)
      return res.status(402).json("Failed to retrieve orders.");
    else if (result?.length === 0)
      return res.status(404).json("No orders found.");
    else return res.status(200).json(result);
  });
};

const updateOrder = (req, res, next) => {
  const { orderId, orderStatus } = req.body;
  let query = `UPDATE Order SET orderStatus = '${orderStatus}' WHERE orderId = '${orderId}')`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length === 0)
      return res.status(402).json("Failed to update order.");
    else return res.status(200).json("Update successfully.");
  });
};

const deleteOrder = (req, res, next) => {
  const { orderId } = req.body;
  let query = `DELETE FROM OrderStatus WHERE orderId = ${orderId}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length === 0)
      return res.status(402).json("Failed to delete order.");
    else return res.status(200).json("Deleted successfully.");
  });
};

exports.createOrder = createOrder;
exports.getOrders = getOrders;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
