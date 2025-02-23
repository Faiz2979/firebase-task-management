import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Status from "./status-enum";
// 🔹 Tambah Task
export const addTask = async (title: string, description:string = "", date: Date ) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: Status.OPEN,
        deadline: new Date(date),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

// 🔹 Ambil Semua Task
export const getTasks = async (): Promise<{ id: string; title: string; description: string; status: Status, deadline: Date }[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map((doc) => ({ 
        id: doc.id, 
        title: doc.data().title as string,
        description: doc.data().description as string,
        status: doc.data().status as Status,
        deadline: doc.data().deadline
    }));
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
};

// 🔹 Update Task (ubah status selesai)
export const updateTask = async (taskId: string, status: Status, title:string , description:string, deadline: Date) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { title,description, status, updatedAt: new Date(), deadline: new Date(deadline) });
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
