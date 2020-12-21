import express from "express";
const router = express.Router();

/* GET Root Info */

router.get("/", (req, res, next) => {
  res.json({
    message: "Online",
  });
});

export default router;
