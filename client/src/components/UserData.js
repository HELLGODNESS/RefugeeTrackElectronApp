import html2canvas from "html2canvas";
import { t } from "i18next";
import React, { useRef, useState } from "react";
import {useTranslation} from "react-i18next";



const tabs = [
  { name: "Profile", href: "#", current: false },
  { name: "Address", href: "#", current: false },
  { name: "Children", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserData(props) {
  const {
    firstName,
    lastName,
    cell,
    bornOn,
    streetAddress,
    city,
    image,
    maritalStatus,
    gender,
    bornIn,
    emailAddress,
    pec,
    religion,
    child,
    zip,
    Family
  } = props;
  console.log(props, "props");
  const identityCardRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Profile");
  const {t} = useTranslation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <article
        ref={identityCardRef}
        className=" bg-white shadow-lg rounded-lg overflow-hidden m-auto w-full pb-4"
      >
        {/* Profile header */}
        <div>
          <div className="h-24 w-full "></div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 justify-center">
              <div className="flex">
                {image && (
                  <div className="">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      src={`http://192.168.119.33:4000/file/${image && image}`}
                      alt="User"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 hidden min-w-0 flex-1 sm:block 2xl:hidden text-center">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {" "}
                <b>
                  {firstName || ""} {lastName || ""}
                </b>
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => handleTabClick(tab.name)}
                    className={classNames(
                      "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                      {
                        "border-pink-500 text-gray-900": activeTab === tab.name,
                        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700":
                          activeTab !== tab.name,
                      }
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {t(tab.name)}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {activeTab === "Profile" && (
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-9 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {" "}
                  {t("Marital status")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {" "}
                  {maritalStatus && <p>{maritalStatus}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Gender")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {" "}
                  {gender && <p>{gender}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Born in")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {bornIn && <p>{bornIn}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Born on")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {bornOn && <p>{bornOn}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Mobile phone")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {cell && <p>{cell}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {emailAddress && <p>{emailAddress}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> Pec</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {pec && <p>{pec}</p>}
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Religion")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {religion && <p>{religion}</p>}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">{t("About")}</dt>
                <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-900" />
              </div>
            </dl>
          </div>
        )}

        {activeTab === "Address" && (
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-9 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("City")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {city && <p>{city}</p>}
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Street")}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {streetAddress && <p>{streetAddress}</p>}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {" "}
                  {t("Postal Code/ Zip")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {zip && <p>{zip}</p>}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {activeTab === "Children" && (
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-9 gap-y-8 sm:grid-cols-2 mb-4">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500"> {t("Child")}: {child || 0} </dt>
              </div>
            </dl>
            {Family && Family.length && Family.map((fam, index) => (<>
              <dl className="grid grid-cols-1 gap-x-9 gap-y-8 sm:grid-cols-4 ">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500"> {t("First Name")}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {fam.firstName && <p>{fam.firstName}</p>}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500"> {t("Last Name")}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {fam.lastName && <p>{fam.lastName}</p>}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500"> {t("Last Name")}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {fam.relation && <p>{fam.relation}</p>}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500"> {t("Last Name")}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {fam.age && <p>{fam.age}</p>}
                  </dd>
                </div>
              </dl>
            </>))}
          </div>

        )}

      </article>
    </React.Fragment>
  );
}
export default React.memo(UserData);
