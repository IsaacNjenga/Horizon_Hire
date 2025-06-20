import UserModel from "../models/User.js";

const updateUser = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "No ID specified" });
  try {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfilePicture = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "No ID specified" });
  try {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const fetchUser = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "No ID specified" });
  try {
    const user = await UserModel.findById({ _id: id });
    const userDetails = { ...user._doc, password: undefined };
    return res.status(200).json({ success: true, userDetails });
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "No ID specified" });
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("There was a server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { updateUser, fetchUser, deleteUser, updateProfilePicture };
