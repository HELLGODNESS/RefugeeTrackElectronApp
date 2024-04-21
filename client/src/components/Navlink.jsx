import { NavLink } from "react-router-dom";
import {
  UserPlusIcon,
  RocketLaunchIcon,
  IdentificationIcon,
  HomeIcon,
  DocumentIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

import { useState } from "react";

const NavLinks = (props) => {
  const { t, i18n } = useTranslation();
  const [selectedLink, setSelectedLink] = useState();
  const lis = [
    {
      title: t("Home"),
      linkTo: "",
      icon: <HomeIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />,
    },

    {
      title: t("People"),
      linkTo: "addPeople",
      icon: (
        <UserPlusIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
      ),
    },
    {
      title: t("Services"),
      linkTo: "services",
      icon: (
        <RocketLaunchIcon
          className="h-7 w-7 text-gray-300"
          aria-hidden="true"
        />
      ),
    },

    {
      title: t("Report"),
      linkTo: "reports",
      icon: (
        <DocumentIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
      ),
    },
    {
      title: t("Users"),
      linkTo: "viewPeople",
      icon: <UsersIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />,
    },
  ];

  return (
    <ul
      className="flex flex-col gap-1 text-gray-300 mt-8 font-semibold w-full h-full"
      onMouseEnter={!props.isButtonClicked ? props.openDrawer : undefined}
      onMouseLeave={!props.isButtonClicked ? props.closeDrawer : undefined}
    >
      {lis.map((content, index) => (
        <li key={index} className="">
          <NavLink
            onClick={() => setSelectedLink(index)}
            to={content.linkTo}
            className={`group flex gap-x-3 p-2 text-sm leading-6 font-semibold 
             items-center w-[230px]                 
                   py-[10px] cursor-pointer  text-white ${selectedLink === index && "bg-[#060311]"} 
                  hover:border-l-[color:var(--red-color)] hover:text-[#e9c26d]  hover:bg-[#070707] hover:pl-[0.88rem]`}
          >
            <span className="ml-3 mr-3">{content.icon}</span>
            <div className="cursor-pointer">{t(content.title)}</div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
