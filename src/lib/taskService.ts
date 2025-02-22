import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Status from "./status-enum";
// 🔹 Tambah Task
export const addTask = async (title: string, description:string = "" ) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: Status.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

// 🔹 Ambil Semua Task
export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
};

// 🔹 Update Task (ubah status selesai)
export const updateTask = async (taskId: string, status: Status, title:string , description:string) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { title,description, status, updatedAt: new Date() });
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

// 🔹 Hapus Task
export const deleteTask = async (taskId: string) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};
