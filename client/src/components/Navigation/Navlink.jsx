import { NavLink } from "react-router-dom";
import { UserPlusIcon,RocketLaunchIcon,IdentificationIcon,HomeIcon,DocumentIcon, }
 from "@heroicons/react/24/solid";



import { useState } from "react";

const NavLinks = (props) => {
  const [selectedLink, setSelectedLink] = useState()
  const lis = [


    {
      title: "Home",
      linkTo: "Home",
      icon: <HomeIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
      // icon: <i className="fas fa-home"></i>,
      // icon: (
      //   <img src={} alt="" className="w-6 invert"></img>
      // ),
    },

    {
      title: "Add User",
      linkTo:"AddUser",
      icon: <UserPlusIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
    },
    {
      title: "Guest Dinner/Weave",
      linkTo:"",
      icon: <i className="fas fa-smile text-lg"></i>
    },
    {
      title: "Card Issuance",
      linkTo:"",
      icon: <IdentificationIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
    },
    {
      title: "Breakfast",
      linkTo:"",
      icon:<i className="fas fa-bread-slice	text-lg"></i>
    },
    {
      title: "Lunch",
      linkTo:"",
      icon:<RocketLaunchIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
    },
    {
      title: "Dinner",
      linkTo:"",
      icon: <i className="fas fa-pizza-slice text-lg"></i>,

    },
    {
      title: "Shower",
      linkTo:"",
      icon: <i className="fas fa-shower text-lg"></i>,
    },
    {
      title: "Report",
      linkTo:"",
      icon: <DocumentIcon className="h-7 w-7 text-gray-300" aria-hidden="true" />
    },
    // {
    //   title: "View all Properties",
    //   linkTo: "viewAllProperties",
    //   icon: <i className="fas fa-home text-lg"></i>,
    // },
    // {
    //   title: "Junaid",
    //   linkTo: "junaid",
    //   icon: <i className="fas fa-home text-lg"></i>,
    // },
    // {
    //   title: "Location",
    //   linkTo: "addLocation",
    //   icon: <i className="fas fa-map-marker-alt text-lg pl-1"></i>,
    // },
    // {
    //   title: "Amenity",
    //   linkTo: "addAmenities",
    //   icon: <img src={amenity} alt="Amenity" className="w-5 invert" />,
    // },
    // {
    //   title: "Unity Type",
    //   linkTo: "addUnitType",
    //   icon: <img src={unitType} alt="Unit Type" className="w-5 invert" />,
    // },
    // {
    //   title: "Developer",
    //   linkTo: "addDeveloper",
    //   icon: <i className="fa fa-user-plus text-lg"></i>,
    // },
    // {
    //   title: "Blog",
    //   linkTo: "addBlog",
    //   icon: <Blog fill="white" width="1.15rem" height="1.15rem" />,
    // },
    // {
    //   title: "Contacts",
    //   linkTo: "contacts",
    //   icon: <i className="fa-regular fa-address-book text-lg"></i>,
    // },
    // {
    //   title: "View Appraisals",
    //   linkTo: "viewAppraisals",
    //   icon: <i className="fa-solid fa-person-circle-check text-lg"></i>,
    // },

    // {
    //   title: "View All Users",
    //   linkTo: "viewAllUsers",
    //   icon: <i className="fa-solid fa-user text-lg"></i>,
    // },
    // {
    //   title: "View All Leads",
    //   linkTo: "viewAllLeads",
    //   icon: <i className="fa-solid fa-cog text-lg"></i>,
    // },
    //  {
    //   title: "View User Properties",
    //   linkTo: "viewUsersProperties",
    //   icon: <i className="fas fa-home text-lg"></i>,
    // },
    // {
    //   title: "User Property",
    //   linkTo: "addUserProperty",
    //   // icon: <i className="fas fa-home"></i>,
    //   icon: (
    //     <img src={addProperty} alt="Add Property" className="w-6 invert"></img>
    //   ),
    // },
  ];

  return (
    <ul
      className="flex flex-col gap-1 text-gray-300 my-4 font-semibold w-full h-full"
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
                   py-[10px] cursor-pointer  text-white ${selectedLink === index && 'bg-[#060311]'} 
                  hover:border-l-[color:var(--red-color)] hover:text-[#e9c26d]  hover:bg-[#070707] hover:pl-[0.88rem]`}
          >
            <span className="ml-3 mr-3">
            {content.icon}

            </span>
            <div className="cursor-pointer">{content.title}</div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
