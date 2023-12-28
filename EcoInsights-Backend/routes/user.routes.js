const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User.model");

/* GET route to display user profile */
router.get("/profile/:userId", isAuthenticated, async (req, res) => {
  let { userId } = req.params;
  const user = req.payload;

  try {
    let currentUser = await User.findById(user._id);
    let profileUser = await User.findById(userId);

    res.json({ profileUser, currentUser });
  } catch (error) {
    res.json(error);
  }
});

/* POST route to update user profile */
router.post("/profile/:userId/edit", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;
    let currentUser = await User.findById(user._id);
    let profileUser = await User.findById(userId);

    const {
      email,
      username,
      first_Name,
      surname,
      date_Of_Birth,
      favourite_On_Nature,
      favouriteSeason,
      profile_Image,
      continent,
      country,
    } = req.body;

    const permission =
      currentUser._id.toString() === profileUser._id.toString();

    if (permission) {
      await User.findByIdAndUpdate(userId, {
        email,
        username,
        first_Name,
        surname,
        date_Of_Birth,
        favourite_On_Nature,
        favouriteSeason,
        profile_Image,
        continent,
        country,
      });
      res.json({
        success: true,
        message: "Your profile was updated successfully.",
      });
    } else {
      res.status(403).json({ error: "Permission denied." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

/* POST route to delete user profile */
router.post("/profile/:userId/delete", isAuthenticated, async (req, res) => {
  try {
    let { userId } = req.params;
    let currentUser = await User.findById(req.session.currentUser._id);
    let profileUser = await User.findById(userId);
    let permission = currentUser._id.toString() === profileUser._id.toString();

    if (permission) {
      await User.findByIdAndDelete(userId);
      req.session.destroy((err) => {
        if (err) {
          res
            .status(500)
            .render("/profile/:userId", { errorMessage: err.message });
        }
      });
    }
    req.json(permission);
  } catch (error) {
    res, json(error);
  }
});
