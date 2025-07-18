const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points for a user
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;
    // Update user points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Record claim history
    const claim = new ClaimHistory({ userId, pointsClaimed: points });
    await claim.save();
    res.json({ user, claim, points });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get leaderboard (users sorted by totalPoints desc)
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get claim history for a user
exports.getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ClaimHistory.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
