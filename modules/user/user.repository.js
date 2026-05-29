import { prisma } from "../config/database.config.js";

export async function db_add_user(user) {
  const createUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password_hash,
      avatar: user.avatar,
      occupation: user.occupation,
      institution: user.institution,
      grade: user.grade,
      about_me: user.about_me,
    },
  });
}

export async function db_getAllUsers() {
  let users = await prisma.user.findMany();
  return users;
}

export async function db_login_user(email) {
  const data = await prisma.user.findFirst({
    where: { email: email },
    select: { email: true, password: true },
  });
  return data;
}

export async function db_get_user_data(email) {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  return user;
}

export async function db_change_about_me(id, new_about_me) {
  const change = await prisma.user.update({
    where: { id: id },
    data: { about_me: new_about_me },
  });
}

export async function db_post_activity(activity) {
  const post = await prisma.activity.create({
    data: { user_id: activity.id, description: activity.description },
  });
}

export async function db_get_activities(id) {
  const activities = await prisma.activity.findMany({
    where: { user_id: id },
    select: { date: true, description: true },
  });
  return activities;
}

export async function db_remove_user_activity(id) {
  await prisma.activity.deleteMany({ where: { user_id: id } });
}

export async function db_get_saved_scholarships(id) {
  const scholars = await prisma.savedScholarship.findMany({
    where: { user_id: id },
    select: { scholarship_id: true },
  });
  return scholars;
}

export async function db_post_saved_scholarship(scholarship_id, id) {
  const post = await prisma.savedScholarship.create({
    data: { scholarship_id: scholarship_id.scholarship_id, user_id: id },
  });
}

export async function db_remove_saved_scholarship(scholarship_id, id) {
  await prisma.savedScholarship.deleteMany({
    where: { user_id: id, scholarship_id: scholarship_id.scholarship_id },
  });
}

export async function db_get_saved_schools(id) {
  const schools = await prisma.savedSchool.findMany({
    where: { user_id: id },
    select: { college_id: true },
  });
  return schools;
}

export async function db_post_saved_schools(school_id, id) {
  const save = await prisma.savedSchool.create({
    data: { user_id: id, college_id: school_id.college_id },
  });
}

export async function db_remove_saved_school(school_id, id) {
  await prisma.savedSchool.deleteMany({
    where: { college_id: school_id, user_id: id },
  });
}
