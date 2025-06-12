const express = require("express");
const router = express.Router();

// Simulated analytics data
const data = {
  followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  engagement: [
    { post: 1, likes: 320, comments: 25 },
    { post: 2, likes: 400, comments: 40 },
    { post: 3, likes: 290, comments: 10 },
    { post: 4, likes: 500, comments: 60 },
    { post: 5, likes: 450, comments: 50 }
  ],
  bestPostTime: "Wednesday 7 PM"
};

router.get("/data", (req, res) => {
  res.status(200).json(data);
});

module.exports = router;
