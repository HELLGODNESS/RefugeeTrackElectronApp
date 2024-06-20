import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import config from "../config";
import Barcode from "react-barcode";
import { isValid, format } from "date-fns";

function IDCard(props) {
  const { id, firstName, lastName, cell, bornOn, streetAddress, city, image } = props;
  const realBornOn = isValid(new Date(bornOn)) ? format(new Date(bornOn), 'dd-MM-yyyy') : "Data non valida";
  const identityCardRef = useRef(null);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div ref={identityCardRef} className="card-container">
        <div className="card bg-stone-50 shadow-lg rounded-lg overflow-hidden">
          <div className="card-header bg-gray-200 flex items-center p-4 ">
            <img
              className="logo w-12 h-12 object-cover rounded-full mr-4"
              src="logo.png"
              alt="Logo"
            />
            <div>
              <h1 className="text-black text-2xl font-bold">Opera Sant'Antonio</h1>
              <h2 className="text-black text-sm">PER I POVERI-ODV</h2>
              <h3 className="text-black text-xs">Via della Fiera 5, Rimini. Tel: 0541783169.</h3>
            </div>
          </div>
          <div className="card-body flex p-4">
            <div className="user-details flex-1">
              <h2 className="text-xl font-semibold">{firstName || ""} {lastName || ""}</h2>
              <h1 className="text-l font-bold">{realBornOn}</h1>
              <Barcode value={id} className="barcode h-10 w-full text-center"/>
            </div>
            <img
              className="user-image w-24 h-24 object-cover rounded-full border-2 border-gray-800 ml-4"
              src={image ? `${config.ipAddress}/file/${image}` : "user.png"}
              alt="User"
            />
          </div>
          <div className="card-footer bg-gray-200 p-4 flex flex-col items-center">
            
            <h1 className="text-sm text-center leading-tight whitespace-nowrap overflow-hidden mt-2">
              {t("This card can be withdrawn at any time.")}
            </h1>
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
