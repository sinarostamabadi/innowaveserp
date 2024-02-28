import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "jalali-moment";
import { numberWithCommas } from "../../../../../../core/_helpers";

export const PrintReport = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  console.log("data > ", data);

  useEffect(() => {
    if (!!data) {
      setDataPrint(data);
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
            paddingTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <h4
            className="text-center"
            style={{
              borderTop: "3px solid #000",
              borderBottom: "3px solid #000",
            }}
          >
            گزارش صندوق{" "}
            {!!dataPrint && !!dataPrint.Param ? dataPrint.Param.Title : ""}
          </h4>
          <div>
            <table className="table" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="head" style={{ textAlign: "center" }}>
                    <b>تاریخ:</b>{" "}
                    {!!dataPrint && !!dataPrint.Param
                      ? (!!dataPrint.Param.FromDate
                          ? dataPrint.Param.FromDate
                          : " ") +
                        " - " +
                        (!!dataPrint.Param.ToDate ? dataPrint.Param.ToDate : "")
                      : ""}
                  </td>
                  <td className="head">
                    <b>تعداد فاکتور:</b>{" "}
                    {!!dataPrint && !!dataPrint.Header
                      ? numberWithCommas(dataPrint.Header.InvoiceCount)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td className="head">
                    <b>دریافت نقدی:</b>{" "}
                    {!!dataPrint && !!dataPrint.Header
                      ? numberWithCommas(dataPrint.Header.PaymentPrice)
                      : ""}
                  </td>
                  <td className="head">
                    <b>دریافت کارتی:</b>{" "}
                    {!!dataPrint && !!dataPrint.Header
                      ? numberWithCommas(dataPrint.Header.PosPrice)
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {!!dataPrint &&
          dataPrint.FactorItems.filter(
            (x) => x.PlaceOfPreparationId == 1 && x.IsCanceled == false
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
                paddingTop: "1rem",
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
                              <th colSpan="2">عنوان</th>
                              <th>تعداد</th>
                              <th>مبلغ کل</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.FactorItems.filter(
                                (x) =>
                                  x.PlaceOfPreparationId == 1 &&
                                  x.IsCanceled == false
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3" colSpan="2">
                                    {model.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
                                  </td>
                                  <td className="text-center pr-3">
                                    {numberWithCommas(model.PayablePrice)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                            <tr>
                              <td className="text-center pr-3" colSpan="2">
                                جمع کل:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 1 &&
                                      x.IsCanceled == false
                                  )
                                    .map((x) => x.PayablePrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                              <td className="text-center pr-3" colSpan="2">
                                جمع تخفیف:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 1 &&
                                      x.IsCanceled == false
                                  )
                                    .map((x) => x.DiscountPrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                            </tr>
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
          dataPrint.FactorItems.filter(
            (x) => x.PlaceOfPreparationId == 2 && x.IsCanceled == false
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
                paddingTop: "1rem",
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
                              <th colSpan="2">عنوان</th>
                              <th>تعداد</th>
                              <th>مبلغ کل</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.FactorItems.filter(
                                (x) =>
                                  x.PlaceOfPreparationId == 2 &&
                                  x.IsCanceled == false
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3" colSpan="2">
                                    {model.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
                                  </td>
                                  <td className="text-center pr-3">
                                    {numberWithCommas(model.PayablePrice)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                            <tr>
                              <td className="text-center pr-3" colSpan="2">
                                جمع کل:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 2 &&
                                      x.IsCanceled == false
                                  )
                                    .map((x) => x.PayablePrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                              <td className="text-center pr-3" colSpan="2">
                                جمع تخفیف:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 2 &&
                                      x.IsCanceled == false
                                  )
                                    .map((x) => x.DiscountPrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                            </tr>
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
          dataPrint.FactorItems.filter(
            (x) => x.PlaceOfPreparationId == 1 && x.IsCanceled
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
                paddingTop: "1rem",
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
                لغو شده‌های آشپزخانه
              </h3>
              <div>
                <table className="table" style={{ width: "100%" }}>
                  <tbody>
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
                              <th colSpan="2">عنوان</th>
                              <th>تعداد</th>
                              <th>مبلغ کل</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.FactorItems.filter(
                                (x) =>
                                  x.PlaceOfPreparationId == 1 && x.IsCanceled
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3" colSpan="2">
                                    {model.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
                                  </td>
                                  <td className="text-center pr-3">
                                    {numberWithCommas(model.PayablePrice)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                            <tr>
                              <td className="text-center pr-3" colSpan="4">
                                جمع کل:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 1 &&
                                      x.IsCanceled
                                  )
                                    .map((x) => x.PayablePrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                            </tr>
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
          dataPrint.FactorItems.filter(
            (x) => x.PlaceOfPreparationId == 2 && x.IsCanceled
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
                paddingTop: "1rem",
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
                لغو شده‌های بار
              </h3>
              <div>
                <table className="table" style={{ width: "100%" }}>
                  <tbody>
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
                              <th colSpan="2">عنوان</th>
                              <th>تعداد</th>
                              <th>مبلغ کل</th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            {!!dataPrint == true ? (
                              dataPrint.FactorItems.filter(
                                (x) =>
                                  x.PlaceOfPreparationId == 2 && x.IsCanceled
                              ).map((model) => (
                                <tr key={model.RestaurantInvoiceDtlId}>
                                  <td className="text-center pr-3" colSpan="2">
                                    {model.NameFa}
                                  </td>
                                  <td className="text-center pr-3">
                                    {model.Count}
                                  </td>
                                  <td className="text-center pr-3">
                                    {numberWithCommas(model.PayablePrice)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                            <tr>
                              <td className="text-center pr-3" colSpan="4">
                                جمع کل:{" "}
                                {numberWithCommas(
                                  dataPrint.FactorItems.filter(
                                    (x) =>
                                      x.PlaceOfPreparationId == 2 &&
                                      x.IsCanceled
                                  )
                                    .map((x) => x.PayablePrice)
                                    .reduce((a, b) => a + b)
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        {!!dataPrint && dataPrint.Ingredients.length > 0 && (
          <div
            className="bill rtl"
            style={{
              direction: "rtl",
              backgroundColor: "#fff",
              width: "100%",
              padding: "0",
              margin: "0",
              pageBreakAfter: "always",
              paddingTop: "1rem",
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
              اقلام مصرفی
            </h3>
            <div>
              <table className="table" style={{ width: "100%" }}>
                <tbody>
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
                            <th>عنوان</th>
                            <th>واحد</th>
                            <th>مقدار</th>
                            <th>مانده</th>
                          </tr>
                        </thead>
                        <tbody style={{ backgroundColor: "white" }}>
                          {!!dataPrint == true ? (
                            dataPrint.Ingredients.map((model) => (
                              <tr key={model.ProductGroupId}>
                                <td className="text-center pr-3">
                                  {model.ProductGroupTitle}
                                </td>
                                <td className="text-center pr-3">
                                  {model.UnitName}
                                </td>
                                <td className="text-center pr-3">
                                  {numberWithCommas(model.SumAmount)}
                                </td>
                                <td className="text-center pr-3">
                                  {numberWithCommas(model.Remained)}
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
