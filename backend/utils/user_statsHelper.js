/**
 * Updates user streak, problem difficulty counts, and total points.
 * Handles deduplication of solve counts and date-based streak logic.
 */
const updateStreakAndStats = async (user, problemDifficulty, earnedPoints) => {
  const now = new Date();
  const lastSubDate = user.activity.lastSubmissionDate;
  const msInDay = 24 * 60 * 60 * 1000;

  // 1. STREAK LOGIC
  if (!lastSubDate) {
    // First time solving a problem
    user.activity.streak = 1;
    user.activity.maxStreak = 1;
  } else {
    // Reset time to zero to compare only the calendar dates
    const start = new Date(lastSubDate).setHours(0, 0, 0, 0);
    const end = new Date(now).setHours(0, 0, 0, 0);
    const dayDiff = Math.round((end - start) / msInDay);

    if (dayDiff === 1) {
      // Consecutive day: Increment streak
      user.activity.streak += 1;
    } else if (dayDiff > 1) {
      // Gap detected: Reset streak
      user.activity.streak = 1;
    }
    // Note: if dayDiff === 0, user already solved a problem today; streak stays the same.
  }

  // Update maxStreak if current streak exceeds it
  if (user.activity.streak > user.activity.maxStreak) {
    user.activity.maxStreak = user.activity.streak;
  }

  // Update last activity timestamp
  user.activity.lastSubmissionDate = now;

  const difficultyField = `${problemDifficulty.toLowerCase()}Solved`;
  const pointsField = `${problemDifficulty.toLowerCase()}Points`;

  // Initialize summary if not present (safety check)
  if (!user.summary) user.summary = {};

  // Increment solve counts (Only once!)
  user.summary[difficultyField] = (user.summary[difficultyField] || 0) + 1;
  user.summary.totalSolved = (user.summary.totalSolved || 0) + 1;

  // Increment points
  user.summary[pointsField] = (user.summary[pointsField] || 0) + earnedPoints;
  user.summary.totalPoints = (user.summary.totalPoints || 0) + earnedPoints;

  // 3. DATABASE PERSISTENCE
  return await user.save();
};

export default updateStreakAndStats;
