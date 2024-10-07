"use client";

import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <nav className="py-3 dark:bg-dark">
            <div className="w-[90%] mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold uppercase flex-1 text-gray-900">
                    Stock <span className="text-teal-400"> List</span>
                </h1>
                <div className="flex flex-1 justify-end">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
