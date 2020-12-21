import Woo3rd from "../../Utils/Woo3rd.js";
import express from "express";
const router = express.Router({ mergeParams: true });

/* Store Info */

router.get("/", async (req, res, next) => {
  let id = req.params.id;

  if (!id) {
    return res.json({ status: "error", msg: "no-id" });
  }

  await Woo3rd.getAsync(`products/${id}`)
    .then((result) => {

      const resultObj = JSON.parse(result.toJSON().body);

      const showCase = resultObj.acf._vitrineProductObject;

      return res.json(showCase);
    })
    .catch((err) => {
      console.log(new Date(), err);
      return res.json({ status: "error" });
    });
});

export default router;
