import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useDebouncer from "../utils/useDebouncer";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AutoComplete({ activeSession, setAddPerson }) {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const {t} = useTranslation();

  const [addService, setService] = useState([]);
  const debounceSearch = useDebouncer(query, 500);
  console.log(people, "people");

  useEffect(() => {
    axios
      .get("http://localhost:4000/person", {
        params: { search: debounceSearch },
      })
      .then((res) => {
        setPeople(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debounceSearch]);

  const handleService = (person) => {
    axios
      .post("http://localhost:4000/service", {
        personId: person.id,
        date: new Date().toDateString(),
        service: activeSession,
      })
      .then((res) => {
        console.log(res.data, "res");
        setAddPerson(res.data);
        setQuery("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-4 px-4">
      <Combobox onChange={(person) => handleService(person)}>
        {({ activeOption }) => (
          <>
            <div className="relative rounded-lg ">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center p-3">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
              <Combobox.Input
                className="bg-[#F9FAFB] block rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm w-[100%]"
                placeholder={t("Search...")}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {query !== "" && people.length > 0 && (
              <Combobox.Options
                as="div"
                static
                hold
                className="flex transform-gpu divide-x divide-gray-100  shadow rounded-b-md"
              >
                <div
                  className={classNames(
                    "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                    activeOption && "sm:h-96"
                  )}
                >
                  <div className="-mx-2 text-sm text-gray-700">
                    {people.map((person) => (
                      <Combobox.Option
                        as="div"
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames(
                            "flex cursor-default select-none items-center rounded-md p-2",
                            active && "bg-gray-100 text-gray-900"
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <img
                              src={
                                person.image
                                  ? `http://localhost:4000/file/${person.image}`
                                  : "user.png"
                              }
                              alt=""
                              className="h-6 w-6 flex-none rounded-full"
                            />
                            <span className="ml-3 flex-auto truncate">
                              {person.firstName || ""} {person.lastName || ""}
                            </span>
                            {active && (
                              <ChevronRightIcon
                                className="ml-3 h-5 w-5 flex-none text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </div>
                </div>

                {activeOption && (
                  <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                    <div className="flex-none p-6 text-center">
                      <img
                        src={
                          activeOption.image
                            ? `http://localhost:4000/file/${activeOption.image}`
                            : "user.png"
                        }
                        alt=""
                        className="mx-auto h-16 w-16 rounded-full"
                      />
                      <h2 className="mt-3 font-semibold text-gray-900">
                        {activeOption.firstName || ""}{" "}
                        {activeOption.lastName || ""}
                      </h2>
                      <p className="text-sm leading-6 text-gray-500">
                        {activeOption.role}
                      </p>
                    </div>
                    <div className="flex flex-auto flex-col justify-between p-6">
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                        <dt className="col-end-1 font-semibold text-gray-900">
                          {t("Mobile phone")}
                        </dt>
                        <dd>{activeOption.cell}</dd>
                        <dt className="col-end-1 font-semibold text-gray-900">
                          {t("Gender")}
                        </dt>
                        <dd>{activeOption.gender}</dd>
                        <dt className="col-end-1 font-semibold text-gray-900">
                          {t("Email")}
                        </dt>
                        <dd className="truncate">
                          <a
                            href={`mailto:${activeOption.emailAddress}`}
                            className="text-indigo-600 underline"
                          >
                            {activeOption.emailAddress}
                          </a>
                        </dd>
                      </dl>
                      {/* <button
                                            type="button"
                                            className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send message
                                        </button> */}
                    </div>
                  </div>
                )}
              </Combobox.Options>
            )}

            {query !== "" && people.length === 0 && (
              <div className="px-6 py-14 text-center text-sm sm:px-14">
                <UsersIcon
                  className="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  No people found
                </p>
                <p className="mt-2 text-gray-500">
                  We couldn’t find anything with that term. Please try again.
                </p>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
}
