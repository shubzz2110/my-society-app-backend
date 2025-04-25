const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/auth");
const getMe = require("../controllers/user/get-me");
const getUsers = require("../controllers/user/get-users");
const validate = require("../middleware/validations");
const { updateUserValidator } = require("../validators/userValidators");
const updateUser = require("../controllers/user/update-user");

router.get("/me", [isUserAuthenticated], getMe);
router.get("/users", [isUserAuthenticated], getUsers);
router.put(
  "/update",
  [isUserAuthenticated, validate(updateUserValidator)],
  updateUser
);

module.exports = router;
