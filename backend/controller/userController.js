import { createJwt, prisma } from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function createUser(req, res) {
  try {
    const { name, username, password, dept, isAdmin } = req.body;

    const user = await prisma.user.findFirst({
      where: { username: String(username) },
    });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        dept,
        isAdmin,
      },
    });
    // create your app JWT
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      user: { id: newUser.id, username: newUser.username, dept: newUser.dept },
      token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { username: String(username) },
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist. Please sign up first.",
      });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (hashedPassword) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({ user, token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    console.log(err);
  }
};
