const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 6);

  try {
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    res.status(403).json({
      message: "Signup is failed",
    });
  }
  res.json({
    message: "Signup succeeded",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exists",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_ADMIN_PASSWORD
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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;
  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "Course updated",
    courses
  });
});

module.exports = {
  adminRouter: adminRouter,
};
