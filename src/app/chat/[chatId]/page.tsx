"use client";

import { db } from "@/lib/firebaseConfig";
import { sendMessage } from "@/pages/chatServices";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
    const { chatId } = useParams() as { chatId: string };
    const [messages, setMessages] = useState<any[]>([]);
    const [chatInfo, setChatInfo] = useState<any>(null);
    const [newMessage, setNewMessage] = useState("");
    const [currentUserID, setCurrentUserID] = useState("") ; // Gantilah dengan user ID yang sesuai

    useEffect(() => {
        if (!chatId) return;
        const storedUser = localStorage.getItem("authToken");
        if (!storedUser) return;
        const decodedToken = JSON.parse(atob(storedUser.split(".")[1]));
        setCurrentUserID(decodedToken.user_id);
        const messagesRef = collection(db, "chats", chatId as string, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgList);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        if (!chatId) return;

        const chatRef = doc(db, "chats", chatId as string);
        getDoc(chatRef).then((chatSnap) => {
            if (chatSnap.exists()) {
                setChatInfo(chatSnap.data());
            }
        });
    }, [chatId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
            await sendMessage(chatId as string, currentUserID, newMessage);
            setNewMessage("");
            
        };

    return (
        <div className="flex h-screen">
            {/* Sidebar otomatis mengikuti class SidebarWithNavbar */}
            <div className="w-80 hidden md:block"></div>

            {/* Chat container */}
            <div className="flex flex-col flex-1 h-full bg-gray-900 text-white">
                {/* Header Chat */}
                <div className="p-4 border-b border-gray-700 bg-gray-800 text-lg font-semibold">
                    {chatInfo?.isGroup ? chatInfo.name : "Private Chat"}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map(msg => (
                        <div 
                            key={msg.id} 
                            className={`p-3 rounded-lg max-w-xs ${msg.senderId === currentUserID ? "bg-blue-500 text-white ml-auto text-right" : "bg-gray-700 text-white mr-auto"}`}>
                            <span>{msg.text}</span>
                        </div>
                    ))}
                </div>

                {/* Input Chat */}
                <div className="p-3 px-64 border-t border-gray-700 bg-gray-800 flex">
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                        placeholder="Type a message..." 
                        className="flex-1 bg-gray-700 text-white p-2 rounded-lg outline-none"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        className="ml-3 px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
