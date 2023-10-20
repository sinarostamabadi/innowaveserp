import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  numberWithCommas,
  EnToFaDateSlash,
  Num2Persian,
} from "src/core/_helpers";

export const PrintReceipt = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    setDataPrint(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
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
              <div style={{ display: "flex", margin: "1rem 0 2rem 0" }}>
                <div style={{ flex: "1" }}>
                  شماره رسید: {dataPrint.ReceiptNo}
                </div>
                <div
                  style={{
                    flex: "1",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {dataPrint.Person.FullNameFa}
                </div>
                <div style={{ flex: "1", textAlign: "left" }}>
                  تاریخ:{" "}
                  {EnToFaDateSlash(dataPrint.FactorDate)}
                </div>
              </div>
              <div style={{ display: "flex", margin: "1rem 0" }}>
                <div style={{ flex: "1" }}>
                  کد اقتصادی:{" "}
                  {!!dataPrint.Person && !!dataPrint.Person.Company
                    ? dataPrint.Person.Company.EconomicCode
                    : ""}
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                  کد پستی:{" "}
                  {!!dataPrint.Person &&
                  !!dataPrint.Person.Addresses &&
                  !!dataPrint.Person.Addresses.length > 0
                    ? dataPrint.Person.Addresses[0].PostalCode
                    : ""}
                </div>
                <div style={{ flex: "1", textAlign: "left" }}>
                  تلفن:{" "}
                  {!!dataPrint.Person && dataPrint.Person.Mobile}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                  marginBottom: "2rem",
                }}
              >
                نشانی:{" "}
                {!!dataPrint.Person &&
                !!dataPrint.Person.Addresses &&
                !!dataPrint.Person.Addresses.length > 0
                  ? dataPrint.Person.Addresses[0].AddressFa
                  : ""}
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "1rem 0",
                  position: "relative",
                  border: "2px solid #000",
                }}
              >
                <div
                  style={{
                    transform: "rotate(-90deg)",
                    background: "#000",
                    color: "#fff",
                    position: "relative",
                    top: "22px",
                    width: "72px",
                    textAlign: "center",
                    height: "25px",
                    right: "-25px",
                  }}
                >
                  تحویل گیرنده
                </div>
                <div
                  style={{ flex: "1", marginRight: "-48px", padding: "0 1rem" }}
                >
                  <div style={{ display: "flex", margin: "1rem 0" }}>
                    <div style={{ flex: "1" }}>
                      نام و نام خانوادگی: {dataPrint.CreateBy.FirstName + " " + dataPrint.CreateBy.LastName}
                    </div>
                    <div style={{ flex: "1", textAlign: "center" }}>
                      کد پستی:{" "}
                      {!!dataPrint.CreateBy &&
                      !!dataPrint.CreateBy.Addresses &&
                      !!dataPrint.CreateBy.Addresses.length > 0
                        ? dataPrint.CreateBy.Addresses[0].PostalCode
                        : ""}
                    </div>
                    <div style={{ flex: "1", textAlign: "left" }}>
                      تلفن:{" "}
                      {!!dataPrint.CreateBy &&
                      !!dataPrint.CreateBy.Phones &&
                      !!dataPrint.CreateBy.Phones.length > 0
                        ? dataPrint.CreateBy.Phones[0].AreaCode +
                          "-" +
                          dataPrint.CreateBy.Phones[0].PhoneNumber
                        : ""}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "right",
                      marginBottom: "2rem",
                    }}
                  >
                    نشانی:{" "}
                    {!!dataPrint.CreateBy &&
                    !!dataPrint.CreateBy.Addresses &&
                    !!dataPrint.CreateBy.Addresses.length > 0
                      ? dataPrint.CreateBy.Addresses[0].AddressFa
                      : ""}
                  </div>
                </div>
              </div>
              <table className="buy-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نام</th>
                    <th>تعداد</th>
                    <th>تاریخ مصرف</th>
                    <th>تاریخ انقضاء</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPrint.ReceiptDtls.map((x, i) => (
                    <tr>
                      <td className="text-center">{i + 1}</td>
                      <td>{x.Product.Name}</td>
                      <td className="text-center">
                        {numberWithCommas(x.Amount)}
                      </td>
                      <td className="text-center">
                        {EnToFaDateSlash(x.ExpireDate)}
                      </td>
                      <td className="text-center">
                        {EnToFaDateSlash(dataPrint.UseDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{ display: "flex", height: "150px", marginTop: "2rem" }}
              >
                <div
                  style={{
                    flex: "1",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  امضا تحویل دهنده
                </div>
                <div
                  style={{
                    flex: "1",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  امضا تحویل گیرنده
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
