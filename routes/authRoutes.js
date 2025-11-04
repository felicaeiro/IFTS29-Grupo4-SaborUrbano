const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/AuthController");

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;