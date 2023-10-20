import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import _ from "lodash";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import { CloneObject, numberWithCommas } from "src/core/_helpers";

export const PrintCloseCash = React.forwardRef(({ data }, ref) => {
  const {t} = useTranslation();
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    if (!!data) {
      let dataSorted = CloneObject(data);
      dataSorted.SellDocumentDetails = _.orderBy(
        data.SellDocumentDetails,
        ["Product.ProductGroupId"],
        ["asc"]
      );

      setDataPrint(dataSorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { auth } = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    shallowEqual
  );

  return (
    <>
      <div ref={ref} style={{ margin: "1rem" }}>
        <h3 className="text-center">بستن صندوق</h3>
        <div
          style={{ border: "1px solid #000", textAlign: "right", padding: "0" }}
        >
          <table
            style={{ fontSize: "1rem", width: "100%", textAlign: "right", direction: "rtl" }}
          >
            <tbody>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>تاریخ: </span>
                  <span style={{ display: "inline-block", direction: "ltr" }}>
                    {moment
                      .from()
                      .locale(process.env.REACT_APP_DATE)
                      .format("YYYY/MM/DD HH:mm:ss")}
                  </span>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>کاربر: </span>
                  <span style={{ display: "inline-block" }}>
                    {auth.user.RealPerson.FullNameFa}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>ساعت شروع: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && !!dataPrint.StartDateTime && (
                      moment(dataPrint.StartDateTime, "YYYY-MM-DDTHH:mm:ss")
                      .locale(process.env.REACT_APP_DATE)
                      .format("HH:mm:ss")
                    )}
                  </span>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>ساعت اتمام: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && !!dataPrint.EndDateTime && (
                      moment(dataPrint.EndDateTime, "YYYY-MM-DDTHH:mm:ss")
                      .locale("en")
                      .format("HH:mm:ss")
                    )}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>مبلغ صندوق: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.CashPrice)}
                  </span>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>مبلغ Pos: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.PosPrice)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>اعتبار: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.CreditPrice)}
                  </span>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>{t("Common.Score")}: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.PointPrice)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>کیف پول: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.WalletPrice)}
                  </span>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>بن: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.BonPrice)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <span style={{ display: "inline-block" }}>تعداد حذف شده: </span>
                  <span style={{ display: "inline-block" }}>
                    {!!dataPrint && numberWithCommas(dataPrint.DeletedCount)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table
          className="sell-detail table table-bordered border-dark"
          style={{ borderSpacing: "0", direction: "rtl", width: "100%" }}
        >
          <thead>
            <tr>
              <th className="border-dark" style={{ width: "10%" }}>
                تعداد
              </th>
              <th className="border-dark" style={{ width: "12%" }}>
                فی
              </th>
              <th className="border-dark" style={{ width: "15%" }}>
                قابل پرداخت
              </th>
              <th className="border-dark" style={{ width: "15%" }}>
                تخفیف
              </th>
              <th className="border-dark" style={{ width: "15%" }}>
                مبلغ دریافتی
              </th>
            </tr>
          </thead>
          <tbody>
            {!!dataPrint && (
              <tr>
                <td className="text-center border-dark">
                  {dataPrint.FactorCount}
                </td>
                <td className="text-center border-dark">
                  {numberWithCommas(dataPrint.Price)}
                </td>
                <td className="border-dark">
                  {numberWithCommas(dataPrint.PayablePrice)}
                </td>
                <td className="border-dark">
                  {numberWithCommas(dataPrint.DiscountPrice)}
                </td>
                <td className="border-dark">
                  {numberWithCommas(dataPrint.FinalPrice)}
                </td>
              </tr>
            )}
            <tr><td colSpan="5" style={{padding: "1rem"}}></td></tr>
          </tbody>
        </table>
        <table
              className="sell-detail table table-bordered border-dark text-black"
              style={{ borderSpacing: "0", direction: "rtl", width: "100%" }}>
              <thead>
                <tr>
                  <th className="border-dark" style={{ width: "5%" }}>
                    <div style={{ transform: "rotate(90deg)" }}>ردیف</div>
                  </th>
                  <th className="border-dark" style={{ width: "35%" }}>
                    کالا
                  </th>
                  <th className="border-dark" style={{ width: "10%" }}>
                    تعداد
                    <br />
                    مقدار
                  </th>
                  <th className="border-dark" style={{ width: "12%" }}>
                    قیمت کالا
                    <hr className="border-dark" />
                    تخفیف
                  </th>
                  <th className="border-dark" style={{ width: "15%" }}>
                    قبل تخفیف
                    <hr className="border-dark" />
                    بعد تخفیف
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {!!dataPrint &&
                  dataPrint.SellDocumentDetails.length &&
                  dataPrint.SellDocumentDetails.map((x, i) => (
                    <tr key={x.SellDocumentDetailId}>
                      <td className="text-center border-dark">{i + 1}</td>
                      <td className="border-dark">{x.Product.Name}</td>
                      <td className="text-center border-dark">{x.Amount}</td>
                      <td className="text-center border-dark">
                        {numberWithCommas(x.Price)}
                        <br />
                        {numberWithCommas(x.DiscountPrice)}
                      </td>
                      <td className="border-dark">
                        {numberWithCommas(x.PayablePrice)}
                        <br />
                        {numberWithCommas(x.FinalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr>
              <td colSpan="5" className="text-center border-dark">
                امضاء
                <br />
                <br />
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="text-center border-dark">
                RoshaSoft.ir
                <br />
                گروه نرم‌افزاری نوت
              </td>
            </tr>
            </table>
      </div>
    </>
  );
});
