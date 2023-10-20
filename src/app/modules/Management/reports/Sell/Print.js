import React, { useState, useEffect } from "react";
import _ from "lodash";
import { CloneObject, numberWithCommas } from "../../../../../core/_helpers";
import { EnToFaDateTimeSlash, EnToFaDateSlash } from "../../../../../core/_helpers";

export const Print = React.forwardRef(({ data, filters }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  const [filterPrint, setFilterPrint] = useState(filters);

  useEffect(() => {
    if (!!data) {
      setDataPrint(data);
    }
    if (!!filters) {
      setFilterPrint(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div ref={ref} style={{ margin: "1rem" }}>
        <h4 className="text-center">گزارش فروش</h4>
        <table
          className="sell-detail table table-bordered border-dark"
          style={{
            borderSpacing: "0",
            direction: "rtl",
            width: "100%",
            border: "none",
          }}
        >
          <thead style={{ backgroundColor: "#ccc" }}>
            <tr>
              <th colSpan="8">
                <div className="flex">
                  <div className="flex-1">{filterPrint && !!filterPrint.FromDate && ("از تاریخ: " + EnToFaDateSlash(filterPrint.FromDate))}</div>
                  <div className="flex-1">{filterPrint && !!filterPrint.ToDate && ("تا تاریخ : " + EnToFaDateSlash(filterPrint.ToDate))}</div>
                </div>
              </th>
            </tr>
            <tr>
              <th className="border-dark" style={{ width: "9%" }}>
                شماره فاکتور
              </th>
              <th className="border-dark" style={{ width: "13%" }}>
                تاریخ فاکتور
              </th>
              <th className="border-dark" style={{ width: "20%" }}>
                خریدار
              </th>
              <th className="border-dark" style={{ width: "20%" }}>
                فروشنده
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                مبلغ
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                تخفیف
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                دریافتی
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                سود
              </th>
            </tr>
          </thead>
          <tbody>
            {!!dataPrint &&
              dataPrint.length > 0 &&
              dataPrint.map((x, i) => (
                <>
                  <tr key={x.SellDocumentId}>
                    <td className="border-dark ltr text-center">
                      {x.SellDocumentId}
                    </td>
                    <td className="border-dark ltr text-center">
                      {EnToFaDateTimeSlash(x.CreationDate)}
                    </td>
                    <td className="border-dark">{x.Person?.FullNameFa}</td>
                    <td className="border-dark ">{x.CreatorName}</td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(x.Price))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(x.DiscountPrice))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(x.PayablePrice))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(x.ProfitPrice))}
                    </td>
                  </tr>
                  {filterPrint.HasDetail && !!x.SellDocumentDetails && x.SellDocumentDetails.length > 0 && (
                    <tr>
                      <td className="border-dark" colSpan="8" style={{ padding: "0.7rem" }}>
                        <table
                          className="sell-detail table table-bordered border-dark"
                          style={{
                            borderSpacing: "0",
                            direction: "rtl",
                            width: "100%",
                            border: "none",
                          }}
                        >
                          <thead style={{ backgroundColor: "#ccc" }}>
                            <tr>
                              <th className="border-dark text-center" style={{ width: "5%" }}>
                                #
                              </th>
                              <th className="border-dark" style={{ width: "25%" }}>
                                کالا
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                واحد شمارش
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                تعداد/مقدار
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                مبلغ
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                تخفیف
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                قابل پرداخت
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                مبلغ نهایی
                              </th>
                              <th className="border-dark" style={{ width: "10%" }}>
                                سود
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {!!x.SellDocumentDetails && x.SellDocumentDetails.length > 0 && x.SellDocumentDetails.map((detail, index) =>
                              <tr key={detail.SellDocumentDetailId}>
                                <td>{index + 1}</td>
                                <td>{detail.ProductName}</td>
                                <td>{detail.UnitName}</td>
                                <td>{numberWithCommas(detail.Amount)}</td>
                                <td>{numberWithCommas(detail.Price)}</td>
                                <td>{numberWithCommas(detail.DiscountPrice)}</td>
                                <td>{numberWithCommas(detail.PayablePrice)}</td>
                                <td>{numberWithCommas(detail.FinalPrice)}</td>
                                <td>{numberWithCommas(detail.Profit)}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {!!dataPrint &&
                dataPrint.length > 0 && (
                  <tr style={{ backgroundColor: "#ccc" }}>
                    <td colSpan="4" className="border-dark ltr text-right">جمـــع کـــل: </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(dataPrint.map(y => y.Price).reduce((a, b) => a + b)))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(dataPrint.map(y => y.DiscountPrice).reduce((a, b) => a + b)))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(dataPrint.map(y => y.PayablePrice).reduce((a, b) => a + b)))}
                    </td>
                    <td className="border-dark ltr text-left">
                      {numberWithCommas(Math.ceil(dataPrint.map(y => y.ProfitPrice).reduce((a, b) => a + b)))}
                    </td>
                  </tr>
                )}
            <tr>
              <td colSpan="9" className="text-center border-dark">
                RoshSoft.ir
                <br />
                گروه نرم‌افزاری نوت
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});
