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

export async function db_remove_user_activity(email) {
  const querySnapshot = await getDocs(collection(database, "activity"));
  for (const documents of querySnapshot.docs) {
    let document_id = documents.id;
    let acts = documents.data();
    if (email == acts.email) {
      await deleteDoc(doc(database, "activity", document_id));
    }
  }
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

export async function db_get_saved_schools(email) {
  let schools = [];
  const querySnapshot = await getDocs(collection(database, "saved_schools"));

  for (const doc of querySnapshot.docs) {
    let saved = doc.data();
    if (email == saved.email) {
      schools.push(saved);
    }
  }
  return schools;
}

export async function db_post_saved_schools(school_data) {
  try {
    const doc_data = await addDoc(collection(database, "saved_schools"), {
      college_name: school_data.college_name,
      email: school_data.email,
    });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
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
