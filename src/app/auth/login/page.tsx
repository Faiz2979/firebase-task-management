"use client";
import { loginUser, loginWithGoogle, logoutUser, registerUser } from "@/pages/authService";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    
    const handleRegister = async () => {
    try {
        const newUser = await registerUser(email, password);
        setUser(newUser);
        router.push("/tasks");
    } catch (error: any) {
        alert(error.message);
    }
};

  const handleLogin = async () => {
    try {
        const loggedInUser = await loginUser(email, password);
        setUser(loggedInUser);
        router.push("/tasks");
    } catch (error: any) {
      alert(error.message);
    }
  };

    const handleGoogleLogin = async () => {
        try {
        const googleUser = await loginWithGoogle();
        setUser(googleUser);
        const token = await googleUser.getIdToken();
        localStorage.setItem("authToken", token);
        router.push("/tasks");
        } catch (error: any) {
        alert(error.message);
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Login</h1>

            {user ? (
                <div>
                <p>Welcome, {user.displayName || user.email}</p>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-2">Logout</button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
                <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">Sign Up</button>
                <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">Login</button>
                <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2">Login with Google</button>
                </div>
            )}
        </div>
    );
}
