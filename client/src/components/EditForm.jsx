import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FileUploader from "../components/FileUploader";
import toast from "react-hot-toast";
import { useRef } from "react";
import "../styles/People.css";
import config from "../config";
import Modal from "./Modal";

export default function EditForm(props) {
  const [fieldSets, setFieldSets] = useState([]);
  const [images, setImages] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    child: "",
    nationality: "",
    bornOn: "",
    maritalStatus: "",
    bornIn: "",
    emailAddress: "",
    country: "",
    streetAddress: "",
    city: "",
    zip: "",
    pec: "",
    cell: "",
    region: "",
    image:"",
    onCancel:""
    
  });

  useEffect(() => {
    // Update formData when props change
    setFormData(props);
  }, [props]);

  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    if (props.onCancel && typeof props.onCancel === 'function') {
      props.onCancel(); // Call onCancel function if it's provided and is a function
    }
}



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.put(
        `${config.ipAddress}/person`,
        formData
      );
      // Handle success
      toast.success(t("User data updated successfully!"));
      
    } catch (error) {
      // Handle error
      console.error(t("Error updating user data:", error));
      toast.error(t("Failed to update user data."));
    }
    props.setEditModalOpen(false)

};

  return (
    <section className="bg-zinc-50 overflow-scroll h-screen w-[100%]">
      <form
        onSubmit={onSubmitHandler}
        className="lg:col-span-9"
        action="#"
        method="POST"
      >
        {/* Profile section */}
        <div className="px-4 py-6 sm:p-6 lg:pb-8 border border-bottom">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("User Detail")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("Put All User Data")}
          </p>
          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("First Name")}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      ref={inputRef}
                      onChange={inputHandler}
                      value={formData.firstName}
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Last Name")}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={inputHandler}
                      value={formData.lastName}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="maritalStatus"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Marital status")}
                  </label>
                  <div className="mt-2">
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={inputHandler}
                      autoComplete="Marital status"
                      className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                    >
                      <option value={"Single"}>{t("Celibate")}</option>
                      <option value={"Married"}>{t("Married")}</option>
                      <option value={"Widowed"}>{t("Widower")}</option>
                      <option value={"Divorced"}>{t("Divorced")}</option>
                    </select>
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
                      value={formData.gender}
                      onChange={inputHandler}
                      autoComplete="Gender"
                      className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                    >
                      <option value={"Male"}>{t("Male")}</option>
                      <option value={"Female"}>{t("Female")}</option>
                    </select>
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
                      value={formData.nationality}
                      onChange={inputHandler}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                      type="text"
                      name="bornOn"
                      id="bornOn"
                      value={formData.bornOn}
                      onChange={inputHandler}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="bornIn"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Born in")}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="bornIn"
                      id="bornIn"
                      value={formData.bornIn}
                      onChange={inputHandler}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                      type="number"
                      name="child"
                      id="child"
                      min="0"
                      max="100"
                      value={formData.child}
                      onChange={(e) => {
                        inputHandler(e);
                        setFieldSets([
                          ...Array.from(
                            { length: +e.target.value },
                            (_, index) => ({ id: index + 1 })
                          ),
                        ]);
                      }}
                      autoComplete="Numero di figli"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Email Address")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      onChange={inputHandler}
                      value={formData.emailAddress}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
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
                      value={formData.cell}
                      onChange={inputHandler}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
                  <label
                    htmlFor="Religion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Religion")}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="religion"
                      id="religion"
                      value={formData.religion}
                      onChange={inputHandler}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
                  <label
                    htmlFor="allergies"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Allergies")}
                  </label>
                  <div className="mt-2">
                    <select
                      id="allergies"
                      name="allergies"
                      value={formData.allergies || ''}
                      onChange={inputHandler}
                      autoComplete="allergies"
                      className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                      defaultValue={"None"}
                    >
                      <option value={"None"}>{t("None")}</option>
                      <option value={"Vegan"}>{t("Vegan")}</option>
                      <option value={"Vegetarian"}>{t("Vegetarian")}</option>
                      <option value={"Kosher"}>{t("Kosher")}</option>
                      <option value={"Gluten Free"}>{t("Gluten Free")}</option>
                      <option value={"Halal"}>{t("Halal")}</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
                  <label
                    htmlFor="document"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Document")}
                  </label>
                  <div className="mt-2">
                    <select
                      id="document"
                      name="document"
                      value={formData.document}
                      onChange={inputHandler}
                      autoComplete="document"
                      className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                    >
                      <option value={"Single"}>{t("Passport")}</option>
                      <option value={"Married"}>{t("Identity Card")}</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
                  <label
                    htmlFor="documentNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Document Number")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="documentNumber"
                      name="documentNumber"
                      type="text"
                      onChange={inputHandler}
                      value={formData.documentNumber}
                      autoComplete="Numero Documento"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
                  <label
                    htmlFor="residencyPermit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Residency Permit")}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="residencyPermit"
                      id="residencyPermit"
                      value={formData.residencyPermit}
                      onChange={inputHandler}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
              <p
                className="text-sm font-medium leading-6 text-gray-900"
                aria-hidden="true"
              >
                {t("Photo")}
              </p>
              <div className="mt-2 lg:hidden">
                <div className="flex items-center">
                  <div
                    className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    <img
                      className="h-full w-full rounded-full"
                      src={(images && URL?.createObjectURL(images)) || 'user.png'}
                      alt=""
                    />
                  </div>
                  <div className="relative ml-5">
                    <input
                      id="mobile-user-photo"
                      name="user-photo"
                      type="file"
                      className="peer absolute h-full w-full rounded-md opacity-0"
                      onChange={(e) => setImages(e.target.files?.[0])}
                    />
                    <label
                      htmlFor="mobile-user-photo"
                      className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative hidden overflow-hidden rounded-full lg:block">
                <div className="col-span-full ">
                  {formData.image && (
                    <div className="relative  flex justify-center rounded-full border border-dashed border-gray-900/25  text-center">
                     <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      src={`${config.ipAddress}/file/${formData.image && formData.image}`}
                      alt="User"
                    />
                      <div className="absolute inset-0 flex  justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <button
                          onClick={() => setImages(null)}
                          className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>  

      

        <div className="mt-12 border-b px-4 sm:px-6 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("Address Information")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("Domicile information")}
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
                  value={formData.city}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="zip"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Postal Code")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  onChange={inputHandler}
                  value={formData.zip}
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8 ">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Street")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>


          </div>
        </div>


        
        <div className="mt-12 border-b px-4 sm:px-6 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("Education/Work")}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1 mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Qualification")}
              </label>
              <div className="mt-2">
                <select
                  type="text"
                  name="qualification"
                  id="qualification"
                  value={formData.qualification || ''}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value={"Degree"}>{t("Degree")}</option>
                  <option value={"High School Diploma"}>{t("High School Diploma")}</option>
                  <option value={"Mid School Diploma"}>{t("Mid School Diploma")}</option>
                  <option value={"Elementary School Diploma"}>{t("Elementary School Diploma")}</option>
              </select>
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="currentProfessionalStatus"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Current Professional Status")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="currentProfessionalStatus"
                  id="currentProfessionalStatus"
                  onChange={inputHandler}
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="monthlyIncome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Monthly Income")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="monthlyIncome"
                  id="monthlyIncome"
                  onChange={inputHandler}
                  value={formData.monthlyIncome || ''}
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8 ">
              <label
                htmlFor="work"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Work Carried out")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="work"
                  id="work"
                  value={formData.work || ''}
                  onChange={inputHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 gap-x-6 gap-y-8 flex">
              <div className="flex-1">
                <label
                  htmlFor="lastJobFrom"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  
                  {t("Last Job Done From")}
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="lastJobFrom"
                    id="lastJobFrom"
                    value={formData.lastJobFrom || ''}
                    onChange={inputHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex-1 ml-4">
                <label
                  htmlFor="lastJobTo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("Last Job Done To")}
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="lastJobTo"
                    id="lastJobTo"
                    value={formData.lastJobTo || ''}
                    onChange={inputHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-12 border-b px-4 sm:px-6 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("About")}
          </h2>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              onChange={inputHandler}
              rows={3}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div> 
      </form>
    

      <form
        action="/submit"
        method="post"
        onSubmit={onSubmitHandler}
        className="p-8  grid w-[97%] "
      >
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t("Cancel")}
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("Update")}
          </button>
        </div>
      </form>
    </section>);
}
