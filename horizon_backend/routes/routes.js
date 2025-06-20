import express from "express";
import {
  login,
  passwordChange,
  register,
} from "../controllers/authController.js";
import {
  deleteUser,
  fetchUser,
  updateProfilePicture,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//authentication routes
router.post("/sign-in", login);
router.post("/sign-up", register);
router.post("/password-change", passwordChange);

//general user routes
router.put("/update-user-details", updateUser);
router.get("/get-user", fetchUser);
router.put("/update-profile-picture", updateProfilePicture);
router.delete("/delete-user-profile", deleteUser );

export { router as Router };
