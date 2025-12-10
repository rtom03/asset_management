import { createJwt, prisma } from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function createUser(req, res) {
  try {
    const { name, username, password, isAdmin, manager, title, department } =
      req.body;
    const user = await prisma.user.findFirst({
      where: { username: String(username) },
    });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      let newUser;
      let token;
      if (isAdmin) {
        let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        newUser = await prisma.user.create({
          data: {
            name,
            username,
            password: hashedPassword,
            isAdmin,
            title,
            department: {
              create: {
                name: department.name,
                manager: department.manager,
                location: {
                  create: {
                    name: department.location.name,
                    people: department.location.people,
                    address: department.location.address,
                    city: department.location.city,
                    state: department.location.state,
                  },
                },
              },
            },
          },
        });
        createJwt(res, newUser.id);
      } else {
        newUser = await prisma.user.create({
          data: {
            name,
            username,
            isAdmin,
            title,
            department: {
              create: {
                name: department.name,
                manager: department.manager,
                location: {
                  create: {
                    name: department.location.name,
                    people: department.location.people,
                    address: department.location.address,
                    city: department.location.city,
                    state: department.location.state,
                  },
                },
              },
            },
          },
        });
      }
      return res.status(201).json({
        user: {
          data: newUser,
        },
        token,
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

    const user = await prisma.user.findFirst({
      where: { username: String(username) },
    });

    if (!user) {
      return res.status(404).json({
        message:
          "User does not exist....reach out to your administrator to create account",
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

export const updateUserInfo = async (req, res) => {
  const { title, departmentId } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedData;
    const updateData = {
      title,
    };

    if (departmentId) {
      updatedData = updateData.department = {
        connect: { id: Number(departmentId) },
      };
    }
    updatedData = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res
      .status(200)
      .json({ message: "User info updated successfully", data: updatedData });
  } catch (error) {
    console.log(error);
  }
};
