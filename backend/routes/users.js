const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const getUserByMiddleware = require("../functions/userFunctions/getUserByMiddleware");
const getUserByEmail = require("../functions/userFunctions/getUserByEmail");
const getUsers = require("../functions/userFunctions/getUsers");
const registerUser = require("../functions/userFunctions/registerUser");
const loginUser = require("../functions/userFunctions/loginUser");
const searchUser = require("../functions/userFunctions/searchUser");
const changeUserData = require("../functions/userFunctions/changeUserData");
const checkActualPassword = require("../functions/userFunctions/checkActualPassword");
const changeUserPassword = require("../functions/userFunctions/changeUserPassword");

router.get("/", auth, getUserByMiddleware);

router.get("/user_by_email/:user_email", getUserByEmail);

router.get("/users", getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/search_user", searchUser);

router.put("/edit_profile", auth, changeUserData);

router.put(
  "/check_actual_password",
  auth,
  [
    check(
      "passwordToCheck",
      "Password should have more than 8 simbol"
    ).isLength({ min: 8 }),
  ],
  checkActualPassword
);

router.put(
  "/change_user_password",
  auth,
  [
    check("newPassword", "Should have more than 8 simbols").isLength({
      min: 8,
    }),
  ],
  changeUserPassword
);

module.exports = router;
