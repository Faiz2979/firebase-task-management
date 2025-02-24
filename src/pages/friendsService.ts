import { db } from "@/lib/firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function addFriend(userId: string, friendId: string) {
    const friendRef = doc(db, "users", friendId); // Referensi ke userB
    console.log("User ID:aaaa", userId);
    console.log("Friend ID:", friendId);

    try {
        await updateDoc(friendRef, {
            friendRequests: arrayUnion(userId), // ✅ Menambahkan userA ke friendRequests userB
        });
        console.log("Friend request sent successfully!");
    } catch (error) {
        console.error("Error sending friend request:", error);
    }
}


export async function acceptFriendRequest(userId: string, friendId: string) {
    const userRef = doc(db, "users", userId);
    const friendRef = doc(db, "users", friendId);

    try {
        await updateDoc(userRef, {
            friends: arrayUnion(friendId),
            friendRequests: arrayRemove(friendId), // Menghapus permintaan setelah diterima
        });

        await updateDoc(friendRef, {
            friends: arrayUnion(userId),
        });
    } catch (error) {
        console.error("Error accepting friend request:", error);
    }
}

export async function rejectFriendRequest(userId: string, friendId: string) {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            friendRequests: arrayRemove(friendId),
        });
    } catch (error) {
        console.error("Error rejecting friend request:", error);
    }
}

