import { db } from "@/lib/firebaseConfig";
import Status from "@/lib/status-enum";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, updateDoc } from "firebase/firestore";

// 🔹 Tambah Task
export const addTask = async (title: string, description:string = "", date: Date, userId:string ) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: Status.OPEN,
        deadline: new Date(date),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        tasks: arrayUnion(docRef),
    });
    
    return (docRef.id);
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

// 🔹 Ambil Semua Task
export const getTasks = async (userId: string): Promise<{ id: string; title: string; description: string; status: Status, deadline: Date, userId:string }[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.filter(doc => doc.data().userId === userId);
    return tasks.map((doc: DocumentData) => ({ 
        id: doc.id, 
        title: doc.data().title as string,
        description: doc.data().description as string,
        status: doc.data().status as Status,
        deadline: doc.data().deadline,
        userId: doc.data().userId as string
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
function arrayUnion(docRef: DocumentReference<DocumentData, DocumentData>) {
  throw new Error("Function not implemented.");
}

