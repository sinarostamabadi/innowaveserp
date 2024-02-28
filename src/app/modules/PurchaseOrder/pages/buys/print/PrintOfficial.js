import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  numberWithCommas,
  EnToFaDateSlash,
  Num2Persian,
} from "../../../../../../core/_helpers";

export const PrintOfficial = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  const [providerData, setProviderData] = useState({
    economicCode: "",
    nationalCode: "",
  });
  const [inquiryData, setInquiryData] = useState({
    economicCode: "",
    nationalCode: "",
  });
  useEffect(() => {
    setDataPrint(data);
    setProviderData({
      economicCode:
        !!data && !!data.Provider && !!data.Provider.Company
          ? data.Provider.Company.EconomicCode
          : "",
      nationalCode:
        !!data && !!data.Provider && !!data.Provider.Company
          ? data.Provider.Company.BusinessCertifyNo
          : "",
      postalCode:
        !!data && !!data.Provider.Addresses.length > 0
          ? data.Provider.Addresses[0].PostalCode
          : "",
    });
    setInquiryData({
      economicCode: "٤١١٦٥٧٩١٧٥١٤",
      nationalCode: "١٤٠٠٨٤٩١٠٥٧",
      postalCode: "٥١٥٦٧٦٧٥٧٣",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log("dataPrint > ", dataPrint);
  return (
    <div ref={ref}>
      <div
        className="bill rtl"
        style={{
          direction: "rtl",
          backgroundColor: "#fff",
          width: "100%",
          padding: "0",
          margin: "0",
        }}
      >
        <div style={{ margin: "2rem" }}>
          {!!dataPrint == true ? (
            <>
              <div style={{ display: "flex", margin: "1rem 0px 1rem" }}>
                <div style={{ flex: "1" }}>
                  <img
                    src="/media/logos/logo-black.png"
                    style={{ width: "90px" }}
                    alt="لوگو"
                  />
                </div>
                <div
                  className="font-size-3"
                  style={{
                    flex: "1",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  صورتحساب فروش کالا و خدمات
                </div>
                <div style={{ flex: "1", textAlign: "left" }}>
                  <div>شماره فاکتور: {dataPrint.FactorNumber}</div>
                  <div style={{ marginTop: "1rem" }}>
                    تاریخ: {EnToFaDateSlash(dataPrint.FactorDate)}
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid rgb(0, 0, 0)",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                }}
              >
                <h6 style={{ margin: "0.8rem" }}>مشخصات فروشنده</h6>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  marginTop: "-1px",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ display: "flex", margin: "0.5rem auto" }}>
                  <div style={{ flex: "1" }}>
                    نام شخص حقیقی / حقوقی:{" "}
                    <span>{dataPrint.Provider.FullNameFa}</span>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-left"
                      style={{ flexDirection: "column", paddingLeft: "1rem" }}
                    >
                      شماره اقتصادی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[8]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[9]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[10]}
                      </div>
                      <div className="flex-1">
                        {providerData.economicCode == ""
                          ? null
                          : providerData.economicCode[11]}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-right"
                      style={{
                        paddingRight: "3rem",
                        flexDirection: "column",
                        paddingLeft: "1rem",
                      }}
                    >
                      شماره ثبت / شماره ملی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[8]}
                      </div>
                      <div className="flex-1">
                        {providerData.nationalCode == ""
                          ? null
                          : providerData.nationalCode[9]}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", margin: "0.5rem auto" }}>
                  <div style={{ display: "flex", flex: "1" }}>
                    نشانی کامل:{" "}
                    <div className="flex flex-1">
                      استان:{" "}
                      <span>
                        {!!dataPrint.Provider &&
                        !!dataPrint.Provider.Addresses &&
                        !!dataPrint.Provider.Addresses.length > 0
                          ? dataPrint.Provider.Addresses[0].City.Township
                              .Province.TitleFa
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-1">
                      <span>
                        شهرستان:{" "}
                        {!!dataPrint.Provider &&
                        !!dataPrint.Provider.Addresses &&
                        !!dataPrint.Provider.Addresses.length > 0
                          ? dataPrint.Provider.Addresses[0].City.Township
                              .TitleFa
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-left"
                      style={{ flexDirection: "column", paddingLeft: "1rem" }}
                    >
                      کد پستی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[8]}
                      </div>
                      <div className="flex-1">
                        {providerData.postalCode == ""
                          ? null
                          : providerData.postalCode[9]}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-right"
                      style={{
                        flexDirection: "column",
                        paddingLeft: "1rem",
                        paddingRight: "3rem",
                      }}
                    >
                      شهر:
                    </div>
                    <div className="flex flex-1">
                      <span>
                        {!!dataPrint.Provider &&
                        !!dataPrint.Provider.Addresses &&
                        !!dataPrint.Provider.Addresses.length > 0
                          ? dataPrint.Provider.Addresses[0].City.TitleFa
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-2">
                    نشانی:{" "}
                    {!!dataPrint.Provider &&
                    !!dataPrint.Provider.Addresses.length > 0
                      ? dataPrint.Provider.Addresses[0].AddressFa
                      : ""}
                  </div>
                  <div className="flex flex-1">
                    <div className="flex-1" style={{ paddingRight: "3rem" }}>
                      شماره تلفن / نمابر:
                    </div>
                    <div className="flex-1">
                      {!!dataPrint.Provider &&
                      !!dataPrint.Provider.Phones.length > 0
                        ? dataPrint.Provider.Phones[0].PhoneNumber
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid rgb(0, 0, 0)",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                  marginTop: "0",
                }}
              >
                <h6 style={{ margin: "0.8rem" }}>مشخصات خریدار</h6>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  marginTop: "-1px",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ display: "flex", margin: "0.5rem auto" }}>
                  <div style={{ flex: "1" }}>
                    نام شخص حقیقی / حقوقی: <span>شركت الماس ساتراپ جهان</span>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-left"
                      style={{ flexDirection: "column", paddingLeft: "1rem" }}
                    >
                      شماره اقتصادی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[8]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[9]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[10]}
                      </div>
                      <div className="flex-1">
                        {inquiryData.economicCode == ""
                          ? null
                          : inquiryData.economicCode[11]}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-right"
                      style={{
                        paddingRight: "3rem",
                        flexDirection: "column",
                        paddingLeft: "1rem",
                      }}
                    >
                      شماره ثبت / شماره ملی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[8]}
                      </div>
                      <div className="flex-1">
                        {inquiryData.nationalCode == ""
                          ? null
                          : inquiryData.nationalCode[9]}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", margin: "0.5rem auto" }}>
                  <div style={{ display: "flex", flex: "1" }}>
                    نشانی کامل:{" "}
                    <div
                      className="flex flex-1"
                      style={{ paddingRight: "2rem" }}
                    >
                      استان: <span>تبريز </span>
                    </div>
                    <div className="flex flex-1">
                      <span> شهرستان: تبريز</span>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-left"
                      style={{ flexDirection: "column", paddingLeft: "1rem" }}
                    >
                      کد پستی:
                    </div>
                    <div
                      className="flex flex-1 ltr"
                      style={{ border: "1px solid #000" }}
                    >
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[0]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[1]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[2]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[3]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[4]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[5]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[6]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[7]}
                      </div>
                      <div
                        className="flex-1"
                        style={{ borderRight: "1px solid #000" }}
                      >
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[8]}
                      </div>
                      <div className="flex-1">
                        {inquiryData.postalCode == ""
                          ? null
                          : inquiryData.postalCode[9]}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    <div
                      className="flex flex-1 text-right"
                      style={{
                        flexDirection: "column",
                        paddingLeft: "1rem",
                        paddingRight: "3rem",
                      }}
                    >
                      شهر:
                    </div>
                    <div className="flex flex-1">
                      <span>تبريز</span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-2">
                    نشانی: ضلع جنوب غربي ميدان فهميده مجتمع مسكوني جهان ساتراپ
                  </div>
                  <div className="flex flex-1">
                    <div className="flex-1" style={{ paddingRight: "3rem" }}>
                      شماره تلفن / نمابر:
                    </div>
                    <div className="flex-1">٠٤١٣٦٦٠٦٨٠٠</div>
                  </div>
                </div>
              </div>
              <table className="buy-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                  </tr>
                  <tr>
                    <th>ردیف</th>
                    <th>کد کالا</th>
                    <th>شرح کالا یا خدمات</th>
                    <th>تعداد/مقدار</th>
                    <th>واحد اندازه‌گیری</th>
                    <th>مبلغ واحد (ریال)</th>
                    <th>مبلغ کل (ریال)</th>
                    <th>مبلغ تخفیف</th>
                    <th>مبلغ کل پس از تخفیف (ریال)</th>
                    <th>جمع عوارض و مالیات (ریال)</th>
                    <th>جمع مبلغ کل بعلاوه جمع عوارض و مالیات (ریال)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPrint.BuyDetails.map((x, i) => (
                    <tr>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{x.Product.Code}</td>
                      <td>{x.Product.Name}</td>
                      <td className="text-center">
                        {numberWithCommas(x.Amount)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.ProductUnit.Unit.Name)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.Price)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.Price * x.Amount)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.DiscountPrice)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(
                          +x.Price * +x.Amount - +x.DiscountPrice
                        )}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.CostPrice)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(
                          x.Price * x.Amount - x.DiscountPrice + x.CostPrice
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="6">جــمع کـــل</td>
                    <td>
                      {numberWithCommas(
                        dataPrint.BuyDetails.map(
                          (x) => x.Price * x.Amount
                        ).reduce((a, b) => a + b)
                      )}
                    </td>
                    <td className="text-center">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map((x) => x.DiscountPrice).reduce(
                          (a, b) => a + b
                        )
                      )}
                    </td>
                    <td className="text-center">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map(
                          (x) => x.Amount * x.Price - x.DiscountPrice
                        ).reduce((a, b) => a + b)
                      )}
                    </td>
                    <td className="text-center">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map((x) => x.CostPrice).reduce(
                          (a, b) => a + b
                        )
                      )}
                    </td>
                    <td className="text-center">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map(
                          (x) =>
                            x.Amount * x.Price - x.DiscountPrice + x.CostPrice
                        ).reduce((a, b) => a + b)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                className="flex-1"
                style={{
                  flex: "1 1 0%",
                  marginTop: "1px",
                  textAlign: "right",
                  border: "1px solid #000",
                  padding: "1rem 2rem",
                  marginLeft: "0.1rem",
                  borderRadius: "0.5rem",
                  width: "50%",
                  boxSizing: "border-box",
                }}
              >
                شرایط و نحوه پرداخت: {dataPrint.BuySettlementType.Title}
              </div>
              <div
                className="flex-1"
                style={{
                  flex: "1 1 0%",
                  textAlign: "right",
                  border: "1px solid #000",
                  padding: "1rem 2rem",
                  marginLeft: "0.1rem",
                  borderRadius: "0.5rem",
                  width: "50%",
                  boxSizing: "border-box",
                }}
              >
                توضیحات:
              </div>
              <div
                style={{ display: "flex", height: "60px", marginTop: "1px" }}
              >
                <div
                  style={{
                    flex: "1 1 0%",
                    textAlign: "right",
                    border: "1px solid #000",
                    padding: "1rem 2rem",
                    marginLeft: "0.1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  مهر و امضا فروشنده
                </div>
                <div
                  style={{
                    flex: "1 1 0%",
                    textAlign: "right",
                    border: "1px solid #000",
                    padding: "1rem 2rem",
                    marginRight: "0.1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  مهر و امضا خریدار
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
});
