"use client";

import ThemeToggle from "./ThemeToggle";
import Login from "./login";

const Navbar = () => {
    return (
        <nav className="py-3 dark:bg-medium bg-teal-800">
            <div className="w-[90%] mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold flex-none dark:text-slate-400">
                    Stock <span className="text-yellow-50">Inventory</span>
                </h1>

                <ul className="flex gap-10 items-center flex-auto justify-center text-gray-900 dark:text-white">

                    <li className="text-white dark:text-white">About</li>

                    <li className="text-white dark:text-white">Contact</li>
                </ul>

                <div className="flex items-center justify-between space-x-4 flex-none">
                    <Login />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
