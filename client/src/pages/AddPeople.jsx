import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploader from "../components/FileUploader";
import toast from "react-hot-toast";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";
import "../styles/People.css";
import "../styles/IDCard.css";

export default function People() {
  const [fieldSets, setFieldSets] = useState([]);
  const [barcodeValue, setBarcodeValue] = useState("");
  const identityCardRef = useRef(null);

  const addFieldSet = () => {
    const newId = fieldSets.length + 1;
    setFieldSets([...fieldSets, { id: newId }]);
  };

  const removeFieldSet = (id) => {
    setFieldSets(fieldSets.filter((fieldSet) => fieldSet.id !== id));
  };

  const [images, setImages] = useState();
  const [oldImages, setOldImages] = useState();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: [],
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
  });

  const inputHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //   // const onSubmitHandler = async (e) => {
  //   //   e.preventDefault();
  //   //   try {
  //   //     await axios.post("http://localhost:4000/person", { ...formData, bornOn: new Date(formData.bornOn) });
  //   //     setFormData({})
  //   //   } catch (error) {
  //   //     console.log(error)
  //   //   }
  //   //   console.log(formData);
  //   // };

  const generateIdentityCard = async () => {
    const canvas = await html2canvas(identityCardRef.current);
    const imageData = canvas.toDataURL("image/png");
    const printableWindow = window.open("", "_blank");
    printableWindow.document.write(
      `<img src="${imageData}" style="width:30%" />`
    );
    printableWindow.document.close();
    printableWindow.print();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Define formState and make the POST request
      const formState = new FormData();
      Object.keys(formData).forEach((key) => {
        formState.append(key, formData[key]);
      });
      const response = await axios.post(
        "http://localhost:4000/person",
        formState
      );

      // Extract the unique identifier (e.g., user ID) from the response
      const userId = response.data.id;
      setBarcodeValue(userId);

      // Generate and print the identity card
      generateIdentityCard();

      // Reset form data after successful request processing
      setFormData({});
      toast.success("Person Added successfully");

      // Calculate new barcode value after setting barcodeValue
      const newBarcodeValue = calculateBarcodeValue();
      setBarcodeValue(newBarcodeValue); // Update barcode value
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  };

  const calculateBarcodeValue = () => {
    // Here you can derive the barcode value based on user's data
    // For example, concatenate user's ID, first name, last name, etc.
    const { id, firstName, lastName, cell, streetAddress, city } = formData;
    // Pad the ID with leading zeros if it's less than 10
    const paddedId = id < 10 ? `0${id}` : id;
    return `${paddedId}-${firstName}-${lastName}-${cell}-${streetAddress}-${city}`;
  };

  // Calculate new barcode value whenever formData changes
  useEffect(() => {
    const newBarcodeValue = calculateBarcodeValue();
    setBarcodeValue(newBarcodeValue);
  }, [formData]);

  useEffect(() => {
    // Initialize JsBarcode after component is mounted
    JsBarcode("#barcode", "barcode value", {
      format: "CODE128",
      width: 1,
      height: 30,
      displayValue: false,
    });
    const imageElement = identityCardRef.current.querySelector("#userImage");
    if (imageElement && images && images.length > 0) {
      const imageUrl = URL.createObjectURL(images[0]);
      imageElement.src = imageUrl;
    }
  }, [barcodeValue, images]); // Include barcodeValue and images in the dependency array

  return (
    <section className=" bg-white  overflow-scroll h-screen w-[100%] ">
      <form className=" lg:col-span-9" action="#" method="POST">
        {/* Profile section */}
        <div className="px-4 py-6 sm:p-6 lg:pb-8">
         
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("User Detail")}{" "}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t(
              "Put All User Data"
            )}
          </p>
          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div className="grid grid-cols-3 gap-4">
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
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      value={formData.lastName}
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
                      type="date"
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
                  min="1" max="100"
                  value={formData.child}
                  onChange={inputHandler}
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
            <div className="">
                  <label
                    htmlFor="document"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Document")}
                  </label>
                  <div className="mt-2">
                    <select
                      id="document"
                      name="documento"
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
              <div className="">
                <label
                htmlFor="Numero Documento"
                className="block text-sm font-medium leading-6 text-gray-900"
                >
                {t("Document Number")}
                </label>
                <div className="mt-2">
                <input
                  id="Numero Documento"
                  name="Numero Documento"
                  type="text"
                  onChange={inputHandler}
                  value={formData.emailAddress}
                  autoComplete="Numero Documento"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
              <div className="">
                <label
                htmlFor="Permesso di soggiorno"
                className="block text-sm font-medium leading-6 text-gray-900"
                >
                {t("Residency Permit")}
                </label>
                <div className="mt-2">
                <input
                  type="text"
                  name="Permesso di soggiorno"
                  id="bornIn"
                  value={formData.bornIn}
                  onChange={inputHandler}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
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
                      src={"user.imageUrl"}
                      alt=""
                    />
                  </div>
                  <div className="relative ml-5">
                    <input
                      id="mobile-user-photo"
                      name="user-photo"
                      type="file"
                      className="peer absolute h-full w-full rounded-md opacity-0"
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
                  {images ? (
                    <div className="relative  flex justify-center rounded-full border border-dashed border-gray-900/25  text-center">
                      <img
                        alt="selected images"
                        className="w-72 h-72  rounded-full"
                        src={URL?.createObjectURL(images)}
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
                  ) : (
                    <FileUploader file={images} setFile={setImages} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 border-b pb-12">
          <div className=" grid grid-cols-3 gap-4	">
          

            {/* <div className="sm:col-span-2 md:col-span-1 mt-2 gap-x-6 gap-y-8">
              <label
                htmlFor="religion"
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
            </div> */}
          </div>
        </div>
        <div className="mt-12 border-b px-4 sm:px-6 pb-12">
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
          <div>
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
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
        </div>
        <div className="mt-12 px-4 sm:px-6">
          <div className="flex justify-between">
          </div>
          <div>
            {fieldSets.map(({ id }) => (
              <div className="mt-10 grid grid-cols-5 gap-4 " key={id}>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFieldSet(id)}
                  className="w-6 h-6 text-right  self-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="text-black w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="container" ref={identityCardRef} id="identity-card">
          <div className="padding">
            <div className="font">
              <div className="companyname ">
                Card <br />
                <span class="tab">Management</span>
              </div>
              <div className="top">
                {images && (
                  <div className="">
                    <img src={URL.createObjectURL(images)} alt="User" />
                  </div>
                )}
              </div>
              <div class="">
                <div className="ename">
                  <p class="p1">
                    <b>
                      {formData.firstName} {formData.lastName}
                    </b>
                  </p>
                </div>
                <div className="edetails">
                  <p>
                    <b>Numero di cellulare : </b>
                    {formData.cell}
                  </p>
                  <p>
                    <b>Data di nascita : </b>
                    {formData.bornOn}
                  </p>
                  <div class="Address">
                    <b>indirizzo : </b>
                    {formData.streetAddress}{" "}
                    {formData.city}{" "}
                  </div>
                </div>
                <div className="mt-[13rem] ml-3">
                  <svg id="barcode" class=""></svg>
                </div>
              </div>
            </div>
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
