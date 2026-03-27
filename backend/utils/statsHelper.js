//all user progress stats details

const updateStreakAndStats = async (user, problemDifficulty, earnedPoints) => {
  const now = new Date();
  const lastSubDate = user.activity.lastSubmissionDate;

  // 1. Update Difficulty Counters
  // We use bracket notation to dynamically update 'easySolved', 'mediumSolved', etc.

  const difficultyFeild = `${problemDifficulty.toLowerCase()}Solved`;

  if (user.summary && typeof user.summary[difficultyFeild] != "undefined") {
    user.summary[difficultyFeild] += 1;
    user.summary.totalSolved += 1;
  }
  //   if()

  if (!lastSubDate) {
    user.activity.streak = 1;
    user.activity.maxStreak = 1;
  } else {
    const msInDay = 24 * 60 * 60 * 1000;

    // reseting the time to zero and getting only date
    const start = new Date(lastSubDate).setHours(0, 0, 0, 0);
    const end = new Date(now).setHours(0, 0, 0, 0);

    const dayDiff = Math.round((end - start) / msInDay);

    if (dayDiff === 0) {
      //user already solved a problem today no need to update or increament the streak count
    } else if (dayDiff === 1) {
      //user solved the next day consecutively increament the streak count
      user.activity.streak += 1;
    } else {
      //user skipped the one or more days streak set to 1
      user.activity.streak = 1;
    }
  }

  // update the maxStreak count if streak is more than maxstreak
  if (user.activity.streak > user.activity.maxStreak) {
    user.activity.maxStreak = user.activity.streak;
  }
  // persist data as it was
  user.activity.lastSubmissionDate = now;

  // Increment Solve Counts
  user.summary[difficultyFeild] = (user.summary[difficultyFeild] || 0) + 1;
  user.summary.totalSolved += 1;

  //Increment points
  const pointsField = `${problemDifficulty.toLowerCase()}Points`;
  user.summary[pointsField] = (user.summary[pointsField] || 0) + 1;
  user.summary.totalPoints += earnedPoints;

  // Save all changes to the Database
  return await user.save();
};

export default updateStreakAndStats;
