import { getScholarships } from "./scholarship.service.js";

export const scholarshipList = async (req, res) => {
  try {
    let scholarships = await getScholarships();
    return res.status(200).json({
      message: "Scholarhips loaded successfully",
      data: scholarships,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
