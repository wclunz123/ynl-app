const jwt = require("jsonwebtoken");
const db = require("../connection");
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const TYPES = require("tedious").TYPES;

const createNews = async (req, res, next) => {
  const { title, desc } = req.body;
  let query = "INSERT INTO `Newsfeed`(newsfeedTitle, newsfeedBody) VALUES('" + title + "', '" + desc + "');";

  try {
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result?.length === 0) {
        const error = new HttpError(
          "Failed creating new newsfeed. Please try again later.",
          402
        );
        return next(error);
      } else {
        let retrieveQuery = "SELECT * FROM `Newsfeed` WHERE newsfeedId = '" + result.insertId + "';";
        db.query(retrieveQuery, (errRetrieve, retrieveResult) => {
          if (errRetrieve) throw errRetrieve;
          if (retrieveResult?.length <= 0) {
            const error = new HttpError(
              "Failed creating new newsfeed. Something went wrong.",
              402
            );
            return next(error);
          } else return res.json(retrieveResult);
        });
      }
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create the newsfeed.",
      500
    );
    return next(error);
  }
};

const getNews = (req, res, next) => {
  let query = "SELECT * FROM `Newsfeed`;";
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length < 0)
      return res.status(402).json("Failed to retrieve orders.");
    else if (result?.length === 0)
      return res.status(404).json("No news found.");
    else return res.status(200).json(result);
  });
};

const updateNews = (req, res, next) => {
  const { newsfeedId, title, desc } = req.body;
  let query = "UPDATE `Newsfeed` SET newsfeedTitle = '" + title + "', newsfeedBody = '" + desc + "' WHERE newsfeedId = '" + newsfeedId + "');";

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length === 0)
      return res.status(402).json("Failed to update news.");
    else return res.status(200).json("Update successfully.");
  });
};

const deleteNews = (req, res, next) => {
  const { id } = req.params;
  let query = "DELETE FROM `Newsfeed` WHERE newsfeedId = '" + id + "';";

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result?.length <= 0) {
      const error = new HttpError(
        "Failed to delete the news. Please try again later.",
        402
      );
      return next(error);
      } else return res.status(200).json("Deleted successfully.");
  });
};

exports.createNews = createNews;
exports.getNews = getNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
