import firebase from "firebase/compat/app";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { StoreData } from "@/types";
import { db } from "./firebase";

const now = new Date();
export const createdAt = () => firebase.firestore.Timestamp.fromDate(now);

export const addJankenSpace = async (data: StoreData) => {
  console.log("addJankenSpace", "start");
  try {
    const docRef = await addDoc(collection(db, "jankenSpace"), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateJankenSpace = async (id: string, data: StoreData) => {
  try {
    const usersCollection = collection(db, "jankenSpace");
    const docRef = doc(usersCollection, id);
    await setDoc(docRef, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getJankenSpace = async (id: string): Promise<StoreData> => {
  try {
    const docRef = doc(db, "jankenSpace", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) throw new Error("No data found");
    return data as StoreData;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
