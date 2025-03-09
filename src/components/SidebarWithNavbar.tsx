"use client";

import { db } from "@/lib/firebaseConfig";
import { openChat } from "@/pages/chatServices";
import { acceptFriendRequest, addFriend } from "@/pages/friendsService";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  user_id: string;
  name: string;
  email: string;
  picture: string;
}

export default function SidebarWithNavbar() {
  const router= useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    const storedUser = localStorage.getItem("authToken");
    if (storedUser) {
      const decodedToken = JSON.parse(atob(storedUser.split(".")[1]));
      setUser(decodedToken);
      fetchFriendsRealtime(decodedToken.user_id);
      fetchFriendRequestsRealtime(decodedToken.user_id);
    }
  }, []);

  function fetchFriendsRealtime(userId: string) {
    const userRef = doc(db, "users", userId);
    return onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.friends)) {
          const friendsData = await Promise.all(
            data.friends.map(async (friendId: string) => {
              const friendDoc = await getDoc(doc(db, "users", friendId));
              return friendDoc.exists() ? { user_id: friendDoc.id, ...friendDoc.data() } as User : null;
            })
          );
          setFriends(friendsData.filter(Boolean) as User[]);
        }
      }
    });
  }

  function fetchFriendRequestsRealtime(userId: string) {
    const userRef = doc(db, "users", userId);
    return onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.friendRequests)) {
          const requests = await Promise.all(
            data.friendRequests.map(async (requestId: string) => {
              const requestDoc = await getDoc(doc(db, "users", requestId));
              return requestDoc.exists() ? { user_id: requestDoc.id, ...requestDoc.data() } as User : null;
            })
          );
          setFriendRequests(requests.filter(Boolean) as User[]);
        }
      }
    });
  }

  async function searchFriends(queryString: string) {
    if (!queryString.trim()) return setSearchResults([]);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", ">=", queryString), where("name", "<=", queryString + "\uf8ff"));
    const querySnapshot = await getDocs(q);
    const results: User[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ user_id: doc.id, ...doc.data() } as User);
    });
    setSearchResults(results);
  }

  async function openMyChat(friendId: string) {
    if (!user) return;
    
    try {
      const chatId = await openChat(user.user_id, friendId);
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  }

  return (
    <>
      <div className={`fixed inset-y-0 left-0 w-80 bg-gray-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform z-40 md:translate-x-0`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-700">
          <Link href="/" className="text-lg font-semibold">TaskCanvas</Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">✕</button>
        </div>

        <nav className="mt-5">
          <button onClick={() => setActiveTab("friends")} className={`block w-full text-left px-4 py-3 ${activeTab === "friends" ? "bg-gray-700" : "hover:bg-gray-600"} flex justify-between`}>
            <span>Friends</span>
          </button>
          <button onClick={() => setActiveTab("friendRequests")} className={`block w-full text-left px-4 py-3 ${activeTab === "friendRequests" ? "bg-gray-700" : "hover:bg-gray-600"} flex justify-between`}>
            <span>Friend Requests</span>
          </button>
          <button onClick={() => setActiveTab("addFriends")} className={`block w-full text-left px-4 py-3 ${activeTab === "addFriends" ? "bg-gray-700" : "hover:bg-gray-600"} flex justify-between`}>
            <span>Add Friends</span>
          </button>
        </nav>

        <div className="p-5">
          {activeTab === "friends" && (
            <div>
              {friends.length > 0 ? friends.map((friend) => (
                <button onClick={() => openMyChat(friend.user_id)} key={friend.user_id} className="flex items-center w-full px-4 py-3 hover:bg-gray-700">
                  <Image src={friend.picture || "/placeholder.svg"} alt={friend.name} width={35} height={35} className="rounded-full" />
                  <span className="ml-3 flex">{friend.name}</span>
                </button>
              )) : <p className="text-gray-400">No friends yet.</p>}
            </div>
          )}
          {activeTab === "friendRequests" && (
            <div>
              {friendRequests.length > 0 ? friendRequests.map((request) => (
                <div key={request.user_id} className="flex items-center px-4 py-3 hover:bg-gray-700">
                  <Image src={request.picture || "/placeholder.svg"} alt={request.name} width={35} height={35} className="rounded-full" />
                  <span className="ml-3 flex-grow">{request.name}</span>
                  <button onClick={() => acceptFriendRequest(request.user_id,user?.user_id as string)} className="bg-green-500 px-2 py-1 rounded text-white">✔</button>
                </div>
              )) : <p className="text-gray-400">No friend requests.</p>}
            </div>
          )}
          {activeTab === "addFriends" && (
            <div>
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchFriends(e.target.value);
                }}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-3"
              />
              {searchResults.length > 0 ? searchResults.map((result) => (
                <div key={result.user_id} className="flex items-center px-4 py-3 hover:bg-gray-700">
                  <Image src={result.picture || "/placeholder.svg"} alt={result.name} width={35} height={35} className="rounded-full" />
                  <span className="ml-3 flex-grow">{result.name}</span>
                  {result.email !== user?.email && (
                    <button onClick={() => addFriend(user?.user_id as string, result.user_id)} className="bg-blue-500 px-2 py-1 rounded text-white">➕</button>
                  )}
                </div>
              )) : <p className="text-gray-400">No users found.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
