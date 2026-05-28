import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../config/firebase_config.js";
import { prisma } from "../config/database_config.js";

export async function db_add_user(user) {
  try {
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
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
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

export async function db_get_saved_scholarships(email) {
  let scholars = [];
  const querySnapshot = await getDocs(
    collection(database, "saved_scholarships"),
  );
  for (const doc of querySnapshot.docs) {
    let saved = doc.data();
    if (email == saved.email) {
      scholars.push(saved);
    }
  }
  return scholars;
}

export async function db_post_saved_scholarship(scholarship_data) {
  try {
    const doc_data = await addDoc(collection(database, "saved_scholarships"), {
      scholarship_name: scholarship_data.scholarship_name,
      email: scholarship_data.email,
    });
  } catch (error) {
    throw Error(`Database Error: ${error.message}`);
  }
}

export async function db_remove_saved_scholarship(scholarship_data) {
  try {
    const querySnapshot = await getDocs(
      collection(database, "saved_scholarships"),
    );
    for (const documents of querySnapshot.docs) {
      let document_id = documents.id;
      let saved = documents.data();
      if (
        scholarship_data.email == saved.email &&
        scholarship_data.scholarship_name == saved.scholarship_name
      ) {
        await deleteDoc(doc(database, "saved_scholarships", document_id));
      }
    }
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
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

export async function db_remove_saved_school(school_data) {
  try {
    const querySnapshot = await getDocs(collection(database, "saved_schools"));
    for (const documents of querySnapshot.docs) {
      let document_id = documents.id;
      let saved = documents.data();
      if (
        school_data.email == saved.email &&
        school_data.college_name == saved.college_name
      ) {
        await deleteDoc(doc(database, "saved_schools", document_id));
      }
    }
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
}
