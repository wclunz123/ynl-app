const express = require("express");
const { check } = require("express-validator");

const newsControllers = require("../controllers/news-controllers");
const router = express.Router();

router.post(
  "/create",
  [check("title").not().isEmpty(), check("desc").not().isEmpty()],
  newsControllers.createNews
);

router.get("/", [], newsControllers.getNews);

router.post(
  "/update",
  [check("title").not().isEmpty(), check("desc").not().isEmpty()],
  newsControllers.updateNews
);

router.delete(
  "/delete/:id",
  [],
  newsControllers.deleteNews
);

module.exports = router;
