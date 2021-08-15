/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer");

/* Route Imports */
const {
  fetchTest,
  routeTest,
  uploadImage,
  deleteImage,
} = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("testId", async (req, res, next, testId) => {
  const test = await fetchTest(testId, next);
  if (test) {
    req.test = test;
    next();
  } else {
    const error = new Error("Test Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Test Objects */
router.get("/", routeTest);

/* Upload Image */
router.post(
  "/uploadImage",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  uploadImage
);

/* Delete Image */
router.delete(
  "/:testId",
  passport.authenticate("jwt", { session: false }),
  deleteImage
);

module.exports = router;
