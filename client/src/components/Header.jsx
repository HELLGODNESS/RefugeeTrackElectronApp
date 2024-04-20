
// src/components/Navbar.js

import React from 'react';
import LanguageSelector from './language';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t, i18n } = useTranslation();
    return (
        <nav className="bg-white h-15 shadow-md border border-b">
            <div className=" ">
                <div className="flex items-center justify-between py-4">
                    <a href="#" className="text-orange-300 font-bold text-xl ml-5">{t("Opera sant'Antonio")}</a>
                    <div className="hidden md:flex mr-5">
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

