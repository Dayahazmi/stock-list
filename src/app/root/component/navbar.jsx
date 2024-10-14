"use client";

import ThemeToggle from "../../component/ThemeToggle";
import Link from "next/link";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";


const Navbar = () => {
    const { logOut } = UserAuth(); // Destructure handleSignOut from UserAuth
    const router = useRouter(); // Initialize useRouter

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/'); // Redirect to homepage or another valid route
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };


    return (
        <nav className="py-3 dark:bg-medium bg-teal-800">
            <div className="w-[90%] mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold flex-none dark:text-slate-400">
                    Stock <span className="text-yellow-50">Inventory</span>
                </h1>



                <div className="flex items-center justify-between space-x-4 flex-none">
                    <button onClick={handleLogout}>Log Out</button>
                </div>


                <div className="flex items-center justify-between space-x-4 flex-none">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;