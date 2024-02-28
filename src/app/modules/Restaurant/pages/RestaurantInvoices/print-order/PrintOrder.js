import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "jalali-moment";
import "./PrintOrder.css";
import { CloneObject } from "../../../../../../core/_helpers/CloneObjectHelpers";

export const PrintReserve = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    if (!!data) {
      let dataSorted = CloneObject(data);
      dataSorted.RestaurantInvoiceDtl = _.orderBy(
        data.RestaurantInvoiceDtl,
        [
          "RestaurantMenuItem.PlaceOfPreparation.Title",
          "RestaurantMenuItem.RestaurantMenuGroup.Title",
          "RestaurantMenuItem.NameFa",
        ],
        ["asc", "asc", "asc"]
      );

      setDataPrint(dataSorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div ref={ref}>
        <div
          className="bill rtl"
          style={{
            direction: "rtl",
            backgroundColor: "#fff",
            width: "100%",
            padding: "0",
            margin: "0",
            pageBreakAfter: "always",
            paddingTop: "5rem",
            marginBottom: "2rem",
          }}
        >
          <h3
            className="text-center"
            style={{
              borderTop: "3px solid #000",
              borderBottom: "3px solid #000",
            }}
          >
            Order
          </h3>
          <div>
            <table className="table" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="head">
                    <b>Invoice number:</b>{" "}
                    {!!dataPrint == true
                      ? dataPrint.InvoiceNumber +
                        (!!dataPrint.InvoiceSeri && dataPrint.InvoiceSeri > 1
                          ? "-" + dataPrint.InvoiceSeri
                          : "")
                      : ""}
                  </td>
                  <td className="head">
                    <b>Table:</b>{" "}
                    {!!dataPrint == true && !!dataPrint.RestaurantTable
                      ? dataPrint.RestaurantTable.Title
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="head">
                    <b>Date:</b>{" "}
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
                  <td colSpan="3" className="bg-black">
                    <table
                      className="table table-bordered lines m-0"
                      style={{
                        width: "100%",
                        zIndex: 10,
                        position: "relative",
                      }}
                    >
                      <thead>
                        <tr className="text-center bg-black">
                          <th className="">Title</th>
                          <th className="">Count</th>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "white" }}>
                        {!!dataPrint == true ? (
                          dataPrint.RestaurantInvoiceDtl.filter(
                            (x) =>
                              x.SavedRestaurantInvoiceId ==
                              x.RestaurantInvoiceId
                          ).map((model) => (
                            <tr key={model.RestaurantInvoiceDtlId}>
                              <td className="text-center pr-3">
                                {model.RestaurantMenuItem.NameFa}
                              </td>
                              <td className="text-center pr-3">
                                {model.Count}
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
              </tbody>
            </table>
          </div>
        </div>
        {!!dataPrint &&
          dataPrint.RestaurantInvoiceDtl.filter(
            (x) =>
              x.SavedRestaurantInvoiceId == x.RestaurantInvoiceId &&
              x.RestaurantMenuItem.PlaceOfPreparationId == 1
          ).length > 0 && (
            <div
              className="bill rtl"
              style={{
                direction: "rtl",
                backgroundColor: "#fff",
                width: "100%",
                padding: "0",
                margin: "0",
                pageBreakAfter: "always",
                paddingTop: "5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                className="text-center"
                style={{
                  borderTop: "3px solid #000",
                  borderBottom: "3px solid #000",
                }}
              >
                آشپزخانه
              </h3>
              <div>
                <table className="table" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td className="head">
                        <b>شماره فاکتور:</b>{" "}
                        {!!dataPrint == true
                          ? dataPrint.InvoiceNumber +
                            (!!dataPrint.InvoiceSeri &&
                            dataPrint.InvoiceSeri > 1
                              ? "-" + dataPrint.InvoiceSeri
                              : "")
                          : ""}
                      </td>
                      <td className="head">
                        <b>میز:</b>{" "}
                        {!!dataPrint == true && !!dataPrint.RestaurantTable
                          ? dataPrint.RestaurantTable.Title
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="head">
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
                      <td colSpan="3" className="bg-black">
                        <table
                          className="table table-bordered lines m-0"
                          style={{
                            width: "100%",
                            zIndex: 10,
                            position: "relative",
                          }}
                        >
                          <thead>
                            <tr className="text-center bg-black">
                              <th className="">عنوان</th>
                              <th className="">تعداد</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.RestaurantInvoiceDtl.filter(
                                (x) =>
                                  x.SavedRestaurantInvoiceId ==
                                    x.RestaurantInvoiceId &&
                                  x.RestaurantMenuItem.PlaceOfPreparationId == 1
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3">
                                    {model.RestaurantMenuItem.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
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
                  </tbody>
                </table>
              </div>
            </div>
          )}
        {!!dataPrint &&
          dataPrint.RestaurantInvoiceDtl.filter(
            (x) =>
              x.SavedRestaurantInvoiceId == x.RestaurantInvoiceId &&
              x.RestaurantMenuItem.PlaceOfPreparationId == 2
          ).length > 0 && (
            <div
              className="bill rtl"
              style={{
                direction: "rtl",
                backgroundColor: "#fff",
                width: "100%",
                padding: "0",
                margin: "0",
                paddingTop: "5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                className="text-center"
                style={{
                  borderTop: "3px solid #000",
                  borderBottom: "3px solid #000",
                }}
              >
                بار
              </h3>
              <div>
                <table className="table" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td className="head">
                        <b>شماره فاکتور:</b>{" "}
                        {!!dataPrint == true
                          ? dataPrint.InvoiceNumber +
                            (!!dataPrint.InvoiceSeri &&
                            dataPrint.InvoiceSeri > 1
                              ? "-" + dataPrint.InvoiceSeri
                              : "")
                          : ""}
                      </td>
                      <td className="head">
                        <b>میز:</b>{" "}
                        {!!dataPrint == true && !!dataPrint.RestaurantTable
                          ? dataPrint.RestaurantTable.Title
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="head">
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
                      <td colSpan="3" className="bg-black">
                        <table
                          className="table table-bordered lines m-0"
                          style={{
                            width: "100%",
                            zIndex: 10,
                            position: "relative",
                          }}
                        >
                          <thead>
                            <tr className="text-center bg-black">
                              <th className="">عنوان</th>
                              <th className="">تعداد</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.RestaurantInvoiceDtl.filter(
                                (x) =>
                                  x.SavedRestaurantInvoiceId ==
                                    x.RestaurantInvoiceId &&
                                  x.RestaurantMenuItem.PlaceOfPreparationId == 2
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3">
                                    {model.RestaurantMenuItem.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
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
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </>
  );
});
