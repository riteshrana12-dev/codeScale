const updateStreakAndStats = async (user, problemDifficulty) => {
  const now = new Date();
  const lastSubDate = user.activity.lastSubmissionDate;

  // 1. Update Difficulty Counters
  // We use bracket notation to dynamically update 'easySolved', 'mediumSolved', etc.

  const difficultyFeild = `${problemDifficulty.toLowerCase()}Solved`;

  if (user.summary && typeof user.summary[difficultyFeild] != "undefined") {
    user.summary[difficultyFeild] += 1;
    user.summary.totalSolved += 1;
  }

  if (!lastSubDate) {
    user.activity.streak = 1;
    user.activity.maxStreak = 1;
  }
};

export default updateStreakAndStats;
