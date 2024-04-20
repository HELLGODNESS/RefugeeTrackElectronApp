
// src/components/Navbar.js

import React from 'react';
import LanguageSelector from './language';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t, i18n } = useTranslation();
    return (
        <nav className="bg-gray-50 h-15">
            <div className=" ">
                <div className="flex items-center justify-between py-4">
                    <a href="#" className="text-orange-300 font-bold text-xl ml-5">{t("Card Management")}</a>
                    <div className="hidden md:flex mr-5">
                        {/* <a href="#" className="text-gray-500 hover:text-white">Home</a>
                        <a href="#" className="text-gray-500 hover:text-white">About</a>
                        <a href="#" className="text-gray-500 hover:text-white">Services</a>
                        <a href="#" className="text-gray-500 hover:text-white">Contact</a> */}
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

