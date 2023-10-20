import React, { useState, useEffect } from "react";
import _ from "lodash";
import { CloneObject, numberWithCommas } from "../../../../../core/_helpers";

export const Print = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    if (!!data) {
      setDataPrint(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
console.log("dataPrint > ", dataPrint)
  return (
    <>
      <div ref={ref} style={{margin: "3rem"}}>
      <table
              className="sell-detail table table-bordered border-dark"
              style={{ borderSpacing: "0", direction: "rtl", width: "100%", border: "none" }}
            >
              <caption>سرجمع فروش بیشترین تعداد</caption>
              <thead>
                <tr>
                  <th className="border-dark" style={{ width: "5%" }}>کد</th>
                  <th className="border-dark" style={{ width: "30%" }}>کالا</th>
                  <th className="border-dark" style={{ width: "15%" }}>گروه کالا</th>
                  <th className="border-dark" style={{ width: "5%" }}>مقدار</th>
                  <th className="border-dark" style={{ width: "10%" }}>فی</th>
                  <th className="border-dark" style={{ width: "10%" }}>مبلغ قابل پرداخت</th>
                  <th className="border-dark" style={{ width: "10%" }}>مبلغ تخفیف</th>
                  <th className="border-dark" style={{ width: "10%" }}>مبلغ نهایی</th>
                  <th className="border-dark" style={{ width: "10%" }}>سود</th>
                </tr>
              </thead>
              <tbody>
                {!!dataPrint &&
                  dataPrint.length &&
                  dataPrint.map((x, i) => (
                    <tr key={x.ProductId}>
                      <td className="border-dark ltr text-left">{x.Code}</td>
                      <td className="border-dark">{x.ProductName}</td>
                      <td className="border-dark">{x.ProductGroupTitle}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.Amount))}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.Price))}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.PayablePrice))}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.DiscountPrice))}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.FinalPrice))}</td>
                      <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(x.Profit))}</td>
                    </tr>
                  ))}
                  <tr key="Total">
                    <td className="border-dark" colSpan="5">جمع</td>
                    <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(!!dataPrint && dataPrint.length && dataPrint.map(x=>x.PayablePrice).reduce((a, b)=> a+b)))}</td>
                    <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(!!dataPrint && dataPrint.length && dataPrint.map(x=>x.DiscountPrice).reduce((a, b)=> a+b)))}</td>
                    <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(!!dataPrint && dataPrint.length && dataPrint.map(x=>x.FinalPrice).reduce((a, b)=> a+b)))}</td>
                    <td className="border-dark ltr text-left">{numberWithCommas(Math.ceil(!!dataPrint && dataPrint.length && dataPrint.map(x=>x.Profit).reduce((a, b)=> a+b)))}</td>
                  </tr>
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
