import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import config from "../config";
import Barcode from "react-barcode";

function IDCard(props) {
  const { id, firstName, lastName, cell, bornOn, streetAddress, city, image } =
    props;
  console.log(props, "props");
  const identityCardRef = useRef(null);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <div ref={identityCardRef}>
        
      <div className="max-w-xs mx-auto bg-stone-50 shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-800">
        <h1 className="text-white text-2xl font-bold">Opera Sant'Antonio</h1>
      </div>
      <div className="flex justify-center mt-4">
        <img
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-800"
          src={image ? `${config.ipAddress}/file/${image}` :"user.png"}
                    alt="User"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold"> {firstName || ""} {lastName || ""}</h2>
        {/* <p className="text-gray-600">Male</p> */}
      </div>
      <div className="px-4 py-2 mt-2 border-t border-gray-200">
      <Barcode value={id} className="h-16 w-[100%]"/>
      </div>
    </div>
        {/* <div>
          <div className="font ">
            <div className="companyname font-med ">
              {t("Opera")}<br />
              <span class="tab">{t("sant'Antonio")}</span>
            </div>
            <div className="top">
                <div className="">
                  <img
                    src={image ? `${config.ipAddress}/file/${image}` :"user.png"}
                    // src={URL.createObjectURL(image)}
                    alt="User"
                  />
                </div>
            </div>
            <div class="">
              <div className="">
                <p class="py-2 text-md w-full " >
                  <b>
                    {firstName || ""} {lastName || ""}
                  </b>
                </p>
              </div>
              <div className="edetails">
                {cell && (
                  <p>
                    <b>{t("Mobile phone")}: </b>
                    {cell}
                  </p>
                )}
                {bornOn && (
                  <p>
                    <b>{t("Born on")}: </b>
                    {bornOn}
                  </p>
                )}
                {(streetAddress || city) && (
                  <div class="Address">
                    <b>{t("Address")}: </b>
                    {streetAddress || ""}
                    {city || ""}{" "}
                  </div>
                )}
              </div>
              <div className="">
              <Barcode value={id} className="h-20 w-[100%] absolute bottom-0"/>
              </div>
            </div>
          </div>
        </div>


         */}
      </div>
    </React.Fragment>
  );
}
export default React.memo(IDCard);
