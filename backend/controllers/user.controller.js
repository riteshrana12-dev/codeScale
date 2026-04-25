import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
//profile
const userProfile = async (req, res) => {
  try {
    const profile = await userModel
      .findById(req.user_id)
      .select(
        "firstName , lastName , email , profile , activity.joinedDate , -_id",
      );

    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile ",
      profile: profile,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

// UPDATE profile
const updateProfile = async (req, res) => {
  try {
    const { bio, github, linkedin, website } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user_id,
      {
        profile: { bio, github, linkedin, website },
      },
      { returnDocument: "after", runValidators: true },
    );
    res.json({ success: true, profile: user.profile.profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /user/account  — updates firstName, lastName, email, password
const updateAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, currentPassword, newPassword } =
      req.body;

    const user = await userModel.findById(req.user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If changing password, verify current password first
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required to set a new password",
        });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (firstName) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account updated",
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
};
export default { userProfile, updateProfile, updateAccount };
