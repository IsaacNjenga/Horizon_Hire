import UserModel from "../models/User.js";

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const fetchUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { updateUser, fetchUser, deleteUser, updateProfilePicture };
