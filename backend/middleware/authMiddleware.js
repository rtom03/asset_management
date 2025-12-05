import jwt from "jsonwebtoken";
import { prisma } from "../utils/db.js";

const protectedRoute = async (req, res, next) => {
  try {
    let token = req.cookie.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const resp = await prisma.user.findUnique({
        where: { id: String(decodedToken.userId) },
        select: { isAdmin, email },
      });

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };
      next();
      return res.status(200).json({ message: "Authenticated" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Not authorized. Try login again" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: "Not an admin user.",
    });
  }
};

export { protectedRoute, isAdminRoute };
