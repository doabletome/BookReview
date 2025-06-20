import User from "../models/User.js";

export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    let user;
    if (id === "me") {
      user = req.user;
    } else {
      user = await User.findById(id).select("-password");
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    // Only allow updating your own profile
    if (id !== req.user._id.toString()) {
      return res.status(403).json({ message: "Cannot update other user" });
    }
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.avatarUrl) updates.avatarUrl = req.body.avatarUrl;

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
}
