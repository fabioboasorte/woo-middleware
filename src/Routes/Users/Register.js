import Woo from "../../Utils/Woo.js";
import express from "express";

const router = express.Router({ mergeParams: true });

/* NEW REGISTER */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody) {
    return res.json({ status: "error", msg: "Prams Error" });
  }

  const email = reqBody.newuser.email;

  let tokenConfirmed = "";

  const userMetaData = reqBody.newuser.meta_data;

  userMetaData.map((item) => {
    if (item.key == "_confirmed") {
      tokenConfirmed = item.value;
    }
  });

  Woo.post("customers", reqBody.newuser)
    .then((result) => {

      console.log(
        new Date(),
        `Register user ${JSON.stringify(reqBody.newuser)}`
      );

      res.json({ status: "success" });
    })
    .catch((err) => {
      console.log(new Date(), err.response.data);
      res.json(err.response.data);
    });
});

export default router;
