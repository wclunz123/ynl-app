const express = require("express");
const { check } = require("express-validator");

const newsControllers = require("../controllers/news-controllers");
const router = express.Router();

router.post(
  "/create",
  [check("newsfeedTitle").not().isEmpty(), check("newsfeedBody").not().isEmpty()],
  newsControllers.createNews
);

router.get("/", [], newsControllers.getNews);

router.post(
  "/update",
  [check("newsfeedTitle").not().isEmpty(), check("newsfeedBody").not().isEmpty()],
  newsControllers.updateNews
);

router.delete(
  "/delete/:newsId",
  [],
  newsControllers.deleteNews
);

module.exports = router;
