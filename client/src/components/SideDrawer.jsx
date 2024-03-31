import React, { useState } from "react";
import config from "../config";
import NavLinks from './Navlink'


function SideDrawer(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const toggleDrawer = () => {
    setIsButtonClicked((prev) => !prev);
    setDrawerIsOpen((prev) => !prev);
  };
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <div
      className={`relative left-0 top-0 z-20 ${drawerIsOpen ? "w-[260px]" : "w-[60px]"
        } transition-all duration-[900ms] h-screen bg-gray-900 card-shadow overflow-hidden`}
      onClick={props.onClick}
    >
      <div
        className={`relative flex ${drawerIsOpen ? "justify-between" : "justify-center"
          } text-gray-300 font-semibold p-4`}
      >
        <h2 className="text-xl"><img src={config.contactDetails.logo} className="w-10" /></h2>
        <button
          className="main-navigation__menu-btn absolute bg-gray-900 px-4 right-1 w-12 h-5 flex flex-col justify-around cursor-pointer"
          onClick={toggleDrawer}
        >
          <span
            className={`${drawerIsOpen ? "-rotate-45 top-[0.52rem]" : "rotate-0"
              } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
          <span
            className={`${drawerIsOpen ? "opacity-0" : "opacity-1"
              } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
          <span
            className={`${drawerIsOpen ? "rotate-45 -top-[0.3rem]" : "rotate-0"
              } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
        </button>
      </div>
      <NavLinks
        isButtonClicked={isButtonClicked}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />

    </div>
  );
}

export default React.memo(SideDrawer);
