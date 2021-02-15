const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')
const { store, index } = require("../controller/Sales");

router.use(isAuth)
router.get("/", index);
router.post("/", store);

module.exports = router;
