import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import "./PrintInvoice.css";
import { numberWithCommas } from "../../../../../../core/_helpers/MoneyUtiles";

export const PrintInvoice = React.forwardRef(({ data }, ref) => {
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
          margin: 0,
        }}
      >
        <img
          alt="جهان ساتراپ"
          src="/media/logos/logo-black.png"
          style={{
            height: "auto",
            width: "75vw",
            display: "block",
            margin: "0.5rem auto",
          }}
        />

        <div
          style={{
            borderTop: "3px solid #000",
            borderBottom: "3px solid #000",
          }}
        >
          <h3 className="text-center">رستوران جهان‌ساتراپ</h3>
        </div>
        <div>
          <table style={{ width: "100%" }} className="table">
            <tbody>
              <tr>
                <td className="head" style={{ width: "50vw" }}>
                  <b>شماره فاکتور:</b>{" "}
                  {!!dataPrint == true
                    ? dataPrint.InvoiceNumber +
                      (!!dataPrint.InvoiceSeri
                        ? !!dataPrint.InvoiceSeri && dataPrint.InvoiceSeri > 1
                          ? "-" + dataPrint.InvoiceSeri
                          : ""
                        : "")
                    : ""}
                </td>
              </tr>
              <tr>
                <td className="head">
                  <b>تاریخ:</b>{" "}
                  {!!dataPrint == true
                    ? moment(dataPrint.InvoiceDate)
                        .locale(process.env.REACT_APP_DATE)
                        .format("YYYY/MM/DD") +
                      " - " +
                      moment(dataPrint.CreationDate).format("HH:mm")
                    : ""}
                </td>
              </tr>
              <tr>
                <td className="head">
                  <b>مشتری:</b>{" "}
                  {!!dataPrint == true && !!dataPrint.Person
                    ? dataPrint.Person.FullNameFa
                    : ""}
                </td>
                <tr></tr>
                <td className="head">
                  <b>میز:</b>{" "}
                  {!!dataPrint == true && !!dataPrint.RestaurantTable
                    ? dataPrint.RestaurantTable.Title
                    : ""}
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="bg-black">
                  <table
                    className="table table-bordered lines m-0"
                    style={{
                      width: "100%",
                      zIndex: 10,
                      position: "relative",
                    }}
                  >
                    <thead>
                      <tr className="text-center">
                        <th className="">عنوان</th>
                        <th className="">تعداد</th>
                        <th className="">مبلغ</th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "white" }}>
                      {!!dataPrint == true ? (
                        dataPrint.RestaurantInvoiceDtl.map((model) => (
                          <tr key={model.RestaurantInvoiceDtlId}>
                            <td className="text-center pr-3">
                              {model.RestaurantMenuItem.NameFa}
                            </td>
                            <td className="text-center pr-3">{model.Count}</td>
                            <td className="text-center pr-3">
                              {numberWithCommas(model.PayablePrice)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="bg-black text-center">
                  مبلغ:{" "}
                  {!!dataPrint
                    ? numberWithCommas(dataPrint.InvoicePrice) + " ریال "
                    : ""}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <br />
                </td>
              </tr>
              <tr className="bg-black bg-dark">
                <td colSpan="2" className="text-center position-relative">
                  <table
                    className="text-white position-relative"
                    style={{ backgroundColor: "trasparent", zIndex: 10 }}
                  >
                    <tbody>
                      <tr>
                        <td
                          className="text-center dark"
                          style={{
                            color: "#fff",
                            backgroundColor: "trasparent!important",
                          }}
                        >
                          تبریز: ضلع جنوب غربی میدان فهمیده، مجتمع تفریحی ورزشی،
                          جهان ساتراپ
                          <br />
                          تلفن: 04136606800
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center">
                  RoshSoft.ir
                  <br />
                  We Provide way to do it
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
