import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import LanguageSelector from "../components/language";
import { useTranslation } from "react-i18next";

export default function People() {
  const [fieldSets, setFieldSets] = useState([{ id: 1 }]);

  const addFieldSet = () => {
    const newId = fieldSets.length + 1;
    setFieldSets([...fieldSets, { id: newId }]);
  };

  const removeFieldSet = (id) => {
    setFieldSets(fieldSets.filter((fieldSet) => fieldSet.id !== id));
  };

  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: [],
    child: "",
    nationality: "",
    bornOn: "",
    maritalStatus: "",
    natoa: "",
    emailAddress: "",
    country: "",
    streetAddress: "",
    city: "",
    region: "",
    zip: "",
    pec: "",
    cell: "",
    uploadFile: null,
  });

  const inputHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      uploadFile: file,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className=" bg-white  overflow-scroll h-screen w-[100%] ">
      <form
        action="/submit"
        method="post"
        onSubmit={onSubmitHandler}
        className="p-8  grid w-[97%] "
      >
        <div className="space-y-12  ">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <LanguageSelector />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {t("User Detail")}{" "}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {t(
                "This information will be displayed publicly so be careful what you share."
              )}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4	">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Name")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={inputHandler}
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Nationality")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Gender")}
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    onChange={inputHandler}
                    autoComplete="Gender"
                    className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    <option value={"Male"}>{t("Male")}</option>
                    <option value={"Female"}>{t("Female")}</option>
                  </select>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Email Address")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={inputHandler}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="child"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Child")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="child"
                    id="child"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("SurName")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="bornOn"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Born on")}
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="bornOn"
                    id="bornOn"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="maritialStatus"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Marital status")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="maritialStatus"
                    id="maritialStatus"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="natoa"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Born in")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="natoa"
                    id="natoa"
                    onChange={inputHandler}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {t("Address Information")}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1 mt-2 gap-x-6 gap-y-8">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("City")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={inputHandler}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Province")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    onChange={inputHandler}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Postal Code")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    onChange={inputHandler}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8 ">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Street")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street"
                    id="street"
                    onChange={inputHandler}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
                <label
                  htmlFor="pec"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Pec")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pec"
                    id="pec"
                    onChange={inputHandler}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
                <label
                  htmlFor="Cell"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Mobile phone")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="cell"
                    id="cell"
                    onChange={inputHandler}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ####################################Child Form ######################################################### */}

        {fieldSets.map(({ id }) => (
          <div className="mt-10 grid grid-cols-4 gap-4 " key={id}>
            <div className="">
              <label
                htmlFor={`firstName-${id}`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("First Name")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={`firstName-${id}`}
                  id={`firstName-${id}`}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor={`lastName-${id}`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Last Name")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={`lastName-${id}`}
                  id={`lastName-${id}`}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor={`relation-${id}`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Relation")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={`relation-${id}`}
                  id={`relation-${id}`}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor={`age-${id}`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Age")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={`age-${id}`}
                  id={`age-${id}`}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFieldSet(id)}
              style={{
                width: "50px",
                backgroundColor: "red",
                color: "white",
                padding: "5px 0",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            >
              -
            </button>
          </div>
        ))}

        {/* Button to add new field set */}
        <button
          type="button"
          onClick={addFieldSet}
          style={{
            width: "50px",
            backgroundColor: "green",
            color: "white",
            padding: "5px 0",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
            margin: "0 auto",
          }}
        >
          +
        </button>

        <div className="flex ">
          <div className="w-[30%] flex-end">
            <div className="col-span-full mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Photo")}
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="uploadFile"
                        name="uploadFile"
                        type="file"
                        onChange={fileInputChangeHandler}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("About")}
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  onChange={inputHandler}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t("Cancel")}
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("Save")}
          </button>
        </div>
      </form>
    </section>
  );
}
