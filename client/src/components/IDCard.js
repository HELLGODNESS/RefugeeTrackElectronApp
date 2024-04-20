import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

function IDCard(props) {
  const { firstName, lastName, cell, bornOn, streetAddress, city, image } =
    props;
  console.log(props, "props");
  const identityCardRef = useRef(null);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <div ref={identityCardRef}>
        <div>
          <div className="font ">
            <div className="companyname ">
              {t("Card")}<br />
              <span class="tab">{t("Management")}</span>
            </div>
            <div className="top">
              {image && (
                <div className="">
                  <img
                    src={`http://localhost:4000/file/${image && image}`}
                    // src={URL.createObjectURL(image)}
                    alt="User"
                  />
                </div>
              )}
            </div>
            <div class="">
              <div className="ename">
                <p class="p1">
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
              <div className="z-1 mt-5 ml-3">
                <svg id="barcode" class=""></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default React.memo(IDCard);
