import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { emailApi } from "../config/mailer_config.js";
import {
  db_add_user,
  db_change_about_me,
  db_get_activities,
  db_get_saved_scholarships,
  db_get_saved_schools,
  db_get_user_data,
  db_getAllUsers,
  db_login_user,
  db_post_activity,
  db_post_saved_scholarship,
  db_post_saved_schools,
  db_remove_saved_scholarship,
  db_remove_saved_school,
  db_remove_user_activity,
} from "../repository/userRepository.js";
import { errorCodes } from "../error/errorCodes.js";

export const register = async (user_data) => {
  if (
    (await db_getAllUsers()).some((value) => value["email"] == user_data.email)
  ) {
    throw new Error(errorCodes.CLIENT.CLIENT_01);
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed_password = await bcrypt.hash(user_data.password, salt);

  const user = {
    name: user_data.name,
    email: user_data.email,
    password_hash: hashed_password,
    avatar: user_data.avatar,
    occupation: user_data.occupation,
    institution: user_data.institution,
    grade: user_data.grade,
    about_me: user_data.about_me,
  };

  try {
    await db_add_user(user);
  } catch (error) {
    console.log(error.message);
    throw new Error(errorCodes.SERVER.SERVER_01);
  }
};

export const sendToken = async (email) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign(
      { email: email, code: code },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" },
    );

    const message = {
      sender: {
        name: "Team Hakbang",
        email: "hakbangapp@gmail.com",
      },
      to: [{ email: email }],
      subject: "Account Verification",
      htmlContent: `
        <h1>Hakbang Account Verification</h1>
        <p>Your code is:</p>
        <h2>${code}</h2>

        <p>If you didn’t ask for this code, you can ignore this email or check
           your account for actions.

           Thanks,</p>
    `,
    };
    emailApi.sendTransacEmail(message);

    return token;
  } catch (err) {
    console.log(error.message);
    throw new Error(errorCodes.SERVER.SERVER_02);
  }
};

export const verifyToken = async (user_data) => {
  let verify = jwt.verify(user_data["token"], process.env.JWT_SECRET_KEY);

  if (verify == null) {
    throw new Error(errorCodes.VERIFICATION.VERI_01);
  }

  if (verify.code != user_data["code"]) {
    throw new Error(errorCodes.VERIFICATION.VERI_02);
  }

  return true;
};

export const login = async (user_data) => {
  let verify = await db_login_user(user_data.email);
  if (
    verify == null ||
    !(await bcrypt.compare(user_data.password, verify.password))
  ) {
    throw new Error(errorCodes.CLIENT.CLIENT_02);
  }

  let data = await db_get_user_data(verify.email);
  let accessToken = jwt.sign({ data: data.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

  return {
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password_hash,
      avatar: data.avatar,
      occupation: data.occupation,
      institution: data.institution,
      role: data.role,
      grade: data.grade,
      about_me: data.about_me,
    },
    token: accessToken,
  };
};

export const changeAboutMe = async (user_data) => {
  const token = user_data.token.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  try {
    await db_change_about_me(user.data, user_data.about_me);
  } catch (error) {
    console.log(error.message);
    throw new Error(errorCodes.SERVER.SERVER_03);
  }
};

export const postActivity = async (activity_details, token) => {
  const filteredToken = token.split(" ")[1];
  const user = jwt.verify(filteredToken, process.env.JWT_SECRET_KEY);
  let data = { id: user.data, description: activity_details.description };
  try {
    await db_post_activity(data);
  } catch (error) {
    throw new Error(errorCodes.SERVER.SERVER_04);
  }
};

export const getActivity = async (id) => {
  let activities = await db_get_activities(id);
  return activities;
};

export const removeActivity = async (token) => {
  const filteredToken = token.split(" ")[1];
  const user = jwt.verify(filteredToken, process.env.JWT_SECRET_KEY);
  try {
    await db_remove_user_activity(user.data);
  } catch (error) {
    console.log(error);
    throw new Error(errorCodes.SERVER.SERVER_05);
  }
};

export const getSavedScholarships = async (email) => {
  let saved = await db_get_saved_scholarships(email);
  return saved;
};

export const postSavedScholarship = async (scholarship_data) => {
  try {
    await db_post_saved_scholarship(scholarship_data);
  } catch (error) {
    throw new Error(`Server Error: ${error.message}`);
  }
};

export const removeSavedScholarship = async (scholarship_data) => {
  try {
    await db_remove_saved_scholarship(scholarship_data);
  } catch (error) {
    throw new Error(`Server Error: ${error.message}`);
  }
};

export const getSavedSchools = async (token) => {
  const filteredToken = token.split(" ")[1];
  const user = jwt.verify(filteredToken, process.env.JWT_SECRET_KEY);
  let saved = await db_get_saved_schools(user.data);
  return saved;
};

export const postSavedSchools = async (school_id, token) => {
  const filteredToken = token.split(" ")[1];
  const user = jwt.verify(filteredToken, process.env.JWT_SECRET_KEY);
  try {
    await db_post_saved_schools(school_id, user.data);
  } catch (error) {
    console.log(error.message);
    throw new Error(errorCodes.SERVER.SERVER_06);
  }
};

export const removeSavedSchool = async (school_data) => {
  try {
    await db_remove_saved_school(school_data);
  } catch (error) {
    throw new Error(`Server Error: ${error.message}`);
  }
};
