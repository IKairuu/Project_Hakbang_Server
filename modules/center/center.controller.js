import { getCenters } from "./center.service.js";

export const centerList = async (req, res) => {
  try {
    let centers = await getCenters();
    return res.status(200).json({
      message: "Successfully retrieved Centers",
      status: 200,
      data: centers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
