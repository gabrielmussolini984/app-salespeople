const express = require("express");
const router = express.Router();
const { store } = require("../controller/Session");

router.post("/", store);

module.exports = router;
