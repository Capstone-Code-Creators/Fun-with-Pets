const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You have reached the api router");
});
router.use("/posts", require("./posts"))
router.use("/user", require("./user"))
router.use("/pets", require("./pets"))
module.exports = router;
