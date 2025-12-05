import { createJwt, prisma } from "../utils/db.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const SALT_ROUNDS = 10;

export async function registerUser(req, res) {
  try {
    const { email, name, password, provider, idToken } = req.body;

    // If a google idToken is passed, verify it server-side and extract payload
    let googlePayload = null;
    if (provider === "google" && idToken) {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      googlePayload = ticket.getPayload(); // has sub, email, name, email_verified
    }

    // If provider google, use sub as providerId and mark email_verified
    let providerId = null;
    let emailVerified = false;
    if (googlePayload) {
      providerId = googlePayload.sub;
      emailVerified = !!googlePayload.email_verified;
    }

    // Check existing user by providerId or email
    let user = null;
    if (providerId) {
      user = await prisma.user.findFirst({
        where: { providerId: String(providerId) },
      });
    }
    if (!user && email) {
      user = await prisma.user.findUnique({ where: { email: String(email) } });
    }

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Only hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const newUser = await prisma.user.create({
      data: {
        email: email || googlePayload?.email,
        name: name || googlePayload?.name,
        password: hashedPassword, // can be null
        provider: provider || (googlePayload ? "google" : "local"),
        providerId: providerId || null,
        emailVerified,
      },
    });

    // create your app JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
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
    const { email, password, provider, idToken } = req.body;

    let user = null;

    // 1. Google OAuth login
    if (provider === "google" && idToken) {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const providerId = payload.sub;

      // Try to find existing Google user
      user = await prisma.user.findFirst({
        where: { providerId: String(providerId) },
      });

      if (!user) {
        return res.status(404).json({
          message: "User does not exist. Please sign up first.",
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({ user, token });
    }

    // 2. Local email/password login
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        message: "This account uses Google sign-in, not password login.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ user, token });
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

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;
    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);
    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;

      const updatedUser = await User.save();

      user.password = undefined;
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(404).josn({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;
      await user.save;

      res.status(200).json({
        message: "Password changed successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
