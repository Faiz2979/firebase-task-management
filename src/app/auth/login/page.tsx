"use client";
import { loginUser, loginWithGoogle, logoutUser } from "@/pages/authService";
import { User } from "firebase/auth";
import { Lock, LogIn, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    
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
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
            {/* Auth Container */}
            <div className="flex flex-col flex-1 h-full bg-gray-800 bg-opacity-80 text-white items-center justify-center">
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
                    {user ? (
                        <div className="text-center">
                            <p>Welcome, {user.displayName || user.email}</p>
                            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 w-full flex items-center justify-center">
                                <LogOut className="mr-2" size={20} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center bg-gray-700 text-white p-2 rounded-lg">
                                <UserIcon className="mr-2" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="bg-transparent outline-none w-full" 
                                />
                            </div>
                            <div className="flex items-center bg-gray-700 text-white p-2 rounded-lg">
                                <Lock className="mr-2" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="bg-transparent outline-none w-full" 
                                />
                            </div>
                            <button onClick={handleLogin} className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 w-full flex items-center justify-center">
                                <LogIn className="mr-2" size={20} /> Login
                            </button>
                            <div className="border-t border-gray-600 my-2"></div>
                            <button onClick={handleGoogleLogin} className="flex items-center justify-center px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 w-full">
                                <FcGoogle className="mr-2" size={20} /> Login with Google
                            </button>
                            <Link href="/auth/register" className="px-4 py-2 rounded-lg text-white hover:underline decoration-white underline-offset-4 w-full">Didn't Have Account?</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
