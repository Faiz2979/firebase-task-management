import { db } from "@/lib/firebaseConfig";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function sendMessage(chatId: string, senderId: string, text: string) {
    if (!text.trim()) return;

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    try {
        await addDoc(messagesRef, {
            senderId,
            text,
            timestamp: serverTimestamp(),
        });

        await updateDoc(chatRef, {
            lastMessage: text,
            updatedAt: serverTimestamp(),
        });

    } catch (error) {
        console.error("Error sending message:", error);
    }
}


export async function createGroupChat(adminId: string, members: string[], groupName: string) {
    const chatsRef = collection(db, "chats");
    const newChatRef = doc(chatsRef);
    
    await updateDoc(newChatRef, {
        members: arrayUnion(adminId, ...members),
        isGroup: true,
        name: groupName,
        lastMessage: "",
        updatedAt: serverTimestamp(),
    });

    return newChatRef.id;
}


export async function openChat(userId: string, friendId: string) {
    const chatId = [userId, friendId].sort().join("_");
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        await createChat(userId, friendId);
    }
    console.log("Chat ID:", chatId);
    return chatId;
}

export async function createChat(userId: string, friendId: string) {
    const chatId = [userId, friendId].sort().join("_");
    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
        await setDoc(chatRef, {
            members: [userId, friendId],
            isGroup: false,
            lastMessage: "",
            updatedAt: serverTimestamp(),
        });
    }
    return chatId;
}
