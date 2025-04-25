const express = require("express");
const addFamilyMember = require("../controllers/user/familymembers/add-member");
const isUserAuthenticated = require("../middleware/auth");
const {
  addFamilyMemberValidator,
  updateFamilyMemberValidator,
} = require("../validators/familyMemberValidators");
const getAllMembers = require("../controllers/user/familymembers/get-members");
const updateFamilyMember = require("../controllers/user/familymembers/update-member");
const validate = require("../middleware/validations");
const deleteFamilyMember = require("../controllers/user/familymembers/delete-member");

const router = express.Router();

router.post(
  "/add-member",
  [isUserAuthenticated, validate(addFamilyMemberValidator)],
  addFamilyMember
);
router.get("/get-members", [isUserAuthenticated], getAllMembers);
router.put(
  "/update-member",
  [isUserAuthenticated, validate(updateFamilyMemberValidator)],
  updateFamilyMember
);
router.delete(
  "/delete-member",
  [isUserAuthenticated, validate(updateFamilyMemberValidator)],
  deleteFamilyMember
);

module.exports = router;
