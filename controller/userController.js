import {
  changeAboutMe,
  getActivity,
  getSavedScholarships,
  login,
  postActivity,
  register,
  removeActivity,
  postSavedScholarship,
  removeSavedScholarship,
  getSavedSchools,
  postSavedSchools,
  removeSavedSchool,
  sendToken,
  verifyToken,
} from "../service/userService.js";

export const registerUser = async (req, res) => {
  let data = req.body;
  try {
    await register(data);
    return res
      .status(200)
      .json({ message: "Registration Successfull", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const sendCodeUser = async (req, res) => {
  let data = req.params.email;
  try {
    let token = await sendToken(data);
    return res
      .status(200)
      .json({ message: "Code sent to email", token: token, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const verifyUser = async (req, res) => {
  let data = req.body;
  try {
    let verification = await verifyToken(data);
    return res.status(200).json({
      message: "Verification  Successfull",
      verified: verification,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const loginUser = async (req, res) => {
  let data = req.body;
  try {
    let user_data = await login({ email: data.email, password: data.password });
    return res
      .status(200)
      .json({ message: user_data.data, token: user_data.token, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const changeAboutUser = async (req, res) => {
  let data = req.body;
  const token = req.headers.authorization;
  try {
    let response = await changeAboutMe({
      token: token,
      about_me: data.about_me,
    });
    return res
      .status(200)
      .json({ message: "Successfully changed", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const addUserActivity = async (req, res) => {
  let activity = req.body;
  let token = req.headers.authorization;
  try {
    await postActivity(activity, token);
    return res.status(200).json({ message: "Successfully added", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const getUserActivity = async (req, res) => {
  let id = req.params.id;
  try {
    let activities = await getActivity(id);
    return res.status(200).json({
      message: "Successfully retrieved activities",
      data: activities,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export const removeUserActivity = async (req, res) => {
  const token = req.headers.authorization;
  try {
    await removeActivity(token);
    return res
      .status(200)
      .json({ message: "Successfully cleared", status: 200 });
  } catch (error) {
    return res.status(200).json({ message: error.message, status: 200 });
  }
};

export const getUserSavedScholarships = async (req, res) => {
  const token = req.headers.authorization;
  try {
    let scholarships = await getSavedScholarships(token);
    return res.status(200).json({
      message: "Successfully retrieved saved scholarships",
      data: scholarships,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
      status: 500,
    });
  }
};

export const postUserSavedScholarship = async (req, res) => {
  let scholar = req.body;
  const token = req.headers.authorization;
  try {
    await postSavedScholarship(scholar, token);
    return res.status(200).json({ message: "Successfully saved", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const removeUserSavedScholarship = async (req, res) => {
  let scholar_id = req.params.scholarship_id;
  const token = req.headers.authorization;
  try {
    await removeSavedScholarship(scholar_id, token);
    return res
      .status(200)
      .json({ message: "Successfully removed", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const getUserSavedSchools = async (req, res) => {
  let token = req.headers.authorization;
  try {
    let schools = await getSavedSchools(token);
    return res.status(200).json({
      message: "Saved Schools successfully retrieved",
      data: schools,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const postUserSavedSchools = async (req, res) => {
  let school_data = req.body;
  const token = req.headers.authorization;
  try {
    await postSavedSchools(school_data, token);
    return res.status(200).json({ message: "Successfully saved", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export const removeUserSavedSchool = async (req, res) => {
  let school_id = req.params.school_id;
  const token = req.headers.authorization;
  try {
    await removeSavedSchool(school_id, token);
    return res
      .status(200)
      .json({ message: "Successfully removed", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
