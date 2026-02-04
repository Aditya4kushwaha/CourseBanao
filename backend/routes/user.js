const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModel, courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 6);
  try {
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    res.status(403).json({
      message: "Signup is failed",
    });
    return;
  }
  res.json({
    message: "Signup succeeded",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exits",
    });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

userRouter.get("/me", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findOne({ _id: userId });
  if (user) {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const purchases = await purchaseModel.find({
    userId,
  });

  const coursesData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({
    purchases,
    coursesData,
  });
});

userRouter.put("/purchase/status", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const { courseId, isCompleted } = req.body;
  
  await purchaseModel.updateOne(
    { userId, courseId },
    { isCompleted }
  );

  res.json({ message: "Status updated" });
});

module.exports = {
  userRouter: userRouter,
};
