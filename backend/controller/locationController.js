import { prisma } from "../utils/db";

export const createLocation = async (req, res) => {
  const { name, people, address, city, state } = req.body;
  try {
    const locationExist = await prisma.location.findUnique({
      where: { name: String(name) },
    });

    if (!locationExist) {
      const data = await prisma.location.create({
        data: {
          name,
          people,
          address,
          city,
          state,
        },
      });

      return res.status(201).json({
        message: "Location created successfully",
        data: {
          id: data.id,
          name: data.name,
          people: data.people,
          address: data.address,
          city: data.city,
          state: data.state,
        },
      });
    }
    return res.status(400).json({
      message: `A location with the name ${name} already exist....try again with a unique value`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLocation = await prisma.
  } catch (error) {
    console.log(error);
  }
};
