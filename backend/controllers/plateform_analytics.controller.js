const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const totalProblems = await problemsModel.countDocuments();

    res.status(200).json({
      success: true,
      user: totalUsers,
      problems: totalProblems,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getPlatformStats;
