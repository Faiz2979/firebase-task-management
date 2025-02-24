import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../lib/firebaseConfig";

// 🔹 Register dengan Email & Password
export const registerUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan user ke Firestore
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        picture: "/images/placeholder.jpg",
        name: user.displayName,
        friends: [],
        friendRequests: [],
        tasks:[],
        createdAt: serverTimestamp(),
    });

    return user;
};

// 🔹 Login dengan Email & Password
export const loginUser = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// 🔹 Login dengan Google
export const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Periksa apakah user sudah ada di Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        friends: [],
        friendRequests: [],
        tasks:[],
        createdAt: serverTimestamp(),
        picture: user.photoURL,
        });
    }

    return user;
};

// 🔹 Logout User
export const logoutUser = async () => {
    await signOut(auth);
};
