import { createJwt, prisma } from "../config/config.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function createUser(req, res) {
  try {
    const { name, username, password, isAdmin, title, department } = req.body;
    const user = await prisma.user.findUnique({
      where: { username: String(username) },
    });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          password: hashedPassword,
          isAdmin,
          title,
          department: {
            connectOrCreate: {
              where: { name: department.name },
              create: {
                name: department.name,
                manager: department.manager,
                location: {
                  connectOrCreate: {
                    where: { name: department.location.name },
                    create: {
                      name: department.location.name,
                      people: 0,
                      address: department.location.address,
                      city: department.location.city,
                      state: department.location.state,
                    },
                  },
                },
              },
            },
          },
        },
      });
      await prisma.location.update({
        where: { name: department.location.name },
        data: { people: { increment: 1 } },
      });

      createJwt(res, newUser.id);
      return res.status(201).json({
        user: {
          data: newUser,
        },
      });
    }
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
    const user = await prisma.user.findUnique({
      where: { username: String(username) },
    });

    if (!user) {
      return res.status(404).json({
        message:
          "User does not exist....reach out to your administrator to create your account",
      });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    console.log(hashedPassword);
    if (!hashedPassword) {
      return res.status(404).json({
        message:
          "password or username does not match! please the correct password",
      });
    }
    createJwt(res, user.id);
    return res.status(200).json({ user });
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

export const updateUserInfo = async (req, res) => {
  const { title, department } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let updateData = {
        title,
      };
      if (department) {
        updateData.department = {
          connect: { name: department },
        };
      }
      const updatedData = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return res
        .status(200)
        .json({ message: "User info updated successfully", data: updatedData });
    }
  } catch (error) {
    console.log(error);
  }
};
