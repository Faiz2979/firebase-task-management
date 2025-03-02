import { db } from "@/lib/firebaseConfig";
import Status from "@/lib/status-enum";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

// 🔹 Tambah Task Collection Baru
export const createTaskCollection = async (userId: string, collectionName: string) => {
    try {
        const userTaskCollections = collection(db, `tasks/${userId}`);
        const docRef = await addDoc(userTaskCollections, {
            name: collectionName,
            createdAt: serverTimestamp(),
        });

        return docRef.id; // ID koleksi tugas yang baru dibuat
    } catch (error) {
        console.error("Error creating task collection: ", error);
    }
};

// 🔹 Tambah Task ke dalam Task Collection
export const addTask = async (userId: string, collectionId: string, title: string, description: string = "", date: Date, isPublic: boolean = false, guests: string[] = []) => {
    try {
        const taskCollectionRef = collection(db, `tasks/${userId}/${collectionId}/taskCollection`);
        const docRef = await addDoc(taskCollectionRef, {
            title,
            description,
            status: Status.OPEN,
            deadline: new Date(date),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isPublic,
            guests,
            ownBy: userId
        });

        return docRef.id;
    } catch (error) {
        console.error("Error adding task: ", error);
    }
};

// 🔹 Ambil Semua Task Collection Milik User
export const getTaskCollections = async (userId: string) => {
    try {
        const userTaskCollections = collection(db, `tasks/${userId}`);
        const querySnapshot = await getDocs(userTaskCollections);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching task collections: ", error);
        return [];
    }
};

// 🔹 Ambil Semua Task dari Satu Task Collection
export const getTasksFromCollection = async (userId: string, collectionId: string) => {
    try {
        const taskCollectionRef = collection(db, `tasks/${userId}/${collectionId}/taskCollection`);
        const querySnapshot = await getDocs(taskCollectionRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        return [];
    }
};

// 🔹 Ambil Task berdasarkan ID (Cek Akses Publik atau Guest)
export const getTaskById = async (userId: string, collectionId: string, taskId: string, requesterId: string) => {
    try {
        const taskRef = doc(db, `tasks/${userId}/${collectionId}/taskCollection`, taskId);
        const taskSnap = await getDoc(taskRef);

        if (!taskSnap.exists()) {
            console.log("Task not found");
            return null;
        }

        const taskData = taskSnap.data();

        // Cek akses task
        if (taskData.isPublic || taskData.ownBy === requesterId || taskData.guests.includes(requesterId)) {
            return { id: taskId, ...taskData };
        } else {
            console.log("Access denied");
            return null;
        }
    } catch (error) {
        console.error("Error fetching task by ID: ", error);
        return null;
    }
};

// 🔹 Update Task (Ubah Status, Judul, Deskripsi, Deadline, Akses)
export const updateTask = async (userId: string, collectionId: string, taskId: string, updatedData: { 
    title?: string, 
    description?: string, 
    status?: Status, 
    deadline?: Date,
    isPublic?: boolean,
    guests?: string[]
}) => {
    try {
        const taskRef = doc(db, `tasks/${userId}/${collectionId}/taskCollection`, taskId);
        await updateDoc(taskRef, {
            ...updatedData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating task: ", error);
    }
};

// 🔹 Hapus Task
export const deleteTask = async (userId: string, collectionId: string, taskId: string) => {
    try {
        const taskRef = doc(db, `tasks/${userId}/${collectionId}/taskCollection`, taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
    }
};

// 🔹 Hapus Task Collection (Hati-hati, semua task di dalamnya akan hilang)
export const deleteTaskCollection = async (userId: string, collectionId: string) => {
    try {
        const taskCollectionRef = doc(db, `tasks/${userId}`, collectionId);
        await deleteDoc(taskCollectionRef);
    } catch (error) {
        console.error("Error deleting task collection: ", error);
    }
};

// 🔹 Tambahkan Guest ke Task
export const addGuestToTask = async (userId: string, collectionId: string, taskId: string, guestId: string) => {
    try {
        const taskRef = doc(db, `tasks/${userId}/${collectionId}/taskCollection`, taskId);
        await updateDoc(taskRef, {
            guests: arrayUnion(guestId),
        });
    } catch (error) {
        console.error("Error adding guest: ", error);
    }
};
