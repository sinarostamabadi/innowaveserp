import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  numberWithCommas,
  EnToFaDateSlash,
  Num2Persian,
} from "../../../../../../core/_helpers";

export const PrintFactor = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    setDataPrint(data);
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
              <div style={{ display: "flex", margin: "1rem 0 2rem 0" }}>
                <div style={{ flex: "1" }}>
                  شماره فاکتور: {dataPrint.FactorNumber}
                </div>
                <div
                  style={{
                    flex: "1",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {dataPrint.Provider.FullNameFa}
                </div>
                <div style={{ flex: "1", textAlign: "left" }}>
                  تاریخ:{" "}
                  {EnToFaDateSlash(
                    dataPrint.FactorDate ||
                      dataPrint.BuyDate ||
                      dataPrint.CreationDate
                  )}
                </div>
              </div>
              <div style={{ display: "flex", margin: "1rem 0" }}>
                <div style={{ flex: "1" }}>
                  کد اقتصادی:{" "}
                  {!!dataPrint.Provider && !!dataPrint.Provider.Company
                    ? dataPrint.Provider.Company.EconomicCode
                    : ""}
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                  کد پستی:{" "}
                  {!!dataPrint.Provider &&
                  !!dataPrint.Provider.Addresses.length > 0
                    ? dataPrint.Provider.Addresses[0].PostalCode
                    : ""}
                </div>
                <div style={{ flex: "1", textAlign: "left" }}>
                  تلفن:{" "}
                  {!!dataPrint.Provider &&
                  !!dataPrint.Provider.Phones.length > 0
                    ? dataPrint.Provider.Phones[0].AreaCode +
                      "-" +
                      dataPrint.Provider.Phones[0].PhoneNumber
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
                {!!dataPrint.Provider &&
                !!dataPrint.Provider.Addresses.length > 0
                  ? dataPrint.Provider.Addresses[0].AddressFa
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
                  خریدار
                </div>
                <div
                  style={{ flex: "1", marginRight: "-48px", padding: "0 1rem" }}
                >
                  <div style={{ display: "flex", margin: "1rem 0" }}>
                    <div style={{ flex: "1" }}>کد اقتصادی: 411657917514</div>
                    <div style={{ flex: "1", textAlign: "center" }}>
                      کد پستی: 51516767573
                    </div>
                    <div style={{ flex: "1", textAlign: "left" }}>
                      تلفن: 04136606800
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "right",
                      marginBottom: "2rem",
                    }}
                  >
                    نشانی: تبريز ضلع جنوب غربي ميدان فهميده مجتمع مسكوني جهان
                    ساتراپ
                  </div>
                </div>
              </div>
              <table className="buy-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نام</th>
                    <th>تعداد</th>
                    <th>قیمت واحد</th>
                    <th>هزینه</th>
                    <th>تخفیف</th>
                    <th>جمع</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPrint.BuyDetails.map((x, i) => (
                    <tr>
                      <td className="text-center">{i + 1}</td>
                      <td>{x.Product.Name}</td>
                      <td className="text-center">
                        {numberWithCommas(x.Amount)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.Price)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.CostPrice)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(x.DiscountPrice)}
                      </td>
                      <td className="text-center">
                        {numberWithCommas(
                          x.Amount * x.Price - x.DiscountPrice + x.CostPrice
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2">جـــمع فـــاکـــتور</td>
                    <td colSpan="2">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map((x) => x.Amount).reduce(
                          (a, b) => a + b
                        )
                      )}
                    </td>
                    <td className="text-center" colSpan="3">
                      {numberWithCommas(
                        dataPrint.BuyDetails.map(
                          (x) =>
                            x.Amount * x.Price - x.DiscountPrice + x.CostPrice
                        ).reduce((a, b) => a + b)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      rowSpan="3"
                      style={{ verticalAlign: "top" }}
                    >
                      توضیحات:{" "}
                    </td>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                      تخفیف
                    </td>
                    <td colSpan="3">
                      {numberWithCommas(dataPrint.SumDiscount)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                      هزینه
                    </td>
                    <td colSpan="3">{numberWithCommas(dataPrint.SumCost)}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                      قابل پرداخت
                    </td>
                    <td colSpan="3">
                      {numberWithCommas(
                        +dataPrint.SumPayable -
                          +dataPrint.SumDiscount +
                          +dataPrint.SumCost
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="7"
                      style={{ fontSize: "0.9rem", textAlign: "left" }}
                    >
                      {Num2Persian(
                        +dataPrint.SumPayable -
                          +dataPrint.SumDiscount +
                          +dataPrint.SumCost
                      )}{" "}
                      ریال
                    </td>
                  </tr>
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
                  امضا فروشنده
                </div>
                <div
                  style={{
                    flex: "1",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  امضا خریدار
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
