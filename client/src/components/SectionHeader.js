import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

function SectionHeader({
  title,
  mainPage,
  mainPageLink,
  breadCrumbs,
  tools
}) {

  const navigate = useNavigate()
  return (
    <div className="  px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between mb-6">
      <div className="min-w-0 flex-1">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <div onClick={() => {
                  mainPageLink && navigate(mainPageLink)
                }} className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
                  {mainPage}
                </div>
              </div>
            </li>
            {breadCrumbs && breadCrumbs.map(x => (<li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <div onClick={() => {
                  x.link && navigate(x.link)
                }} className="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {x.subPage}
                </div>
              </div>
            </li>))}

          </ol>
        </nav>
        <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>

      </div>
      {tools?.()}
    </div>
  );
}

export default React.memo(SectionHeader);
