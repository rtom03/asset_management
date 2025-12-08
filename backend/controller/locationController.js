import { prisma } from "../utils/db";

export const createLocation = async (req, res) => {
  const { name, people, address, city, state } = req.body;
  try {
    const data = await prisma.location.create({
      data: {
        name,
        people,
        address,
        city,
        state,
      },
    });

    res
      .status(201)
      .json({ message: "Location created successfully", data: res });
  } catch (error) {
    console.log(error);
  }
};
