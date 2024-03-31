
// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <a href="#" className="text-white font-bold text-xl">My Logo</a>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Home</a>
                        <a href="#" className="text-gray-300 hover:text-white">About</a>
                        <a href="#" className="text-gray-300 hover:text-white">Services</a>
                        <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

