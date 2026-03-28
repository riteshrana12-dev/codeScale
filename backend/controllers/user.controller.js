import userModel from "../models/user.model.js";
//profile
const userProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user_id)
      .select("firstName , lastName , email , profile , -_id");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile ",
      profile: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

export default userProfile;
