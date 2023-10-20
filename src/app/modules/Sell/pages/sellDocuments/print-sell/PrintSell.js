import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "jalali-moment";
import { CloneObject, numberWithCommas } from "../../../../../../core/_helpers";
var Barcode = require("react-barcode");

export const PrintSell = React.forwardRef(({ data }, ref) => {
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

  return (
    <>
      <div ref={ref}>
        <div
          className="text-black"
          style={{ border: "1px solid rgb(0, 0, 0)" }}
        >
          <h3
            style={{
              borderBottom: "1px solid rgb(0, 0, 0)",
              textAlign: "center",
              margin: "0",
              padding: "3pt 0",
              direction: "rtl",
            }}
          >
            صورت‌حساب فروش کالا -
            <span style={{ direction: "ltr", display: "inline-block" }}>
              {!!dataPrint == false
                ? ""
                : moment()
                  .locale(process.env.REACT_APP_DATE)
                  .format("YYYY/MM/DD - HH:mm")}
            </span>
          </h3>
          <div style={{}}>
            <div
              style={{
                float: "right",
                width: "25%",
                height: "auto",
                padding: "3pt",
                boxSizing: "border-box",
              }}
            >
              <img
                alt="جهان ساتراپ"
                src="/media/logos/hyper.jpg"
                style={{
                  height: "28mm",
                  width: "auto",
                  display: "block",
                  margin: "0.5rem auto",
                }}
              />
            </div>
            <div
              style={{
                float: "left",
                width: "75%",
                height: "auto",
                textAlign: "right",
                padding: "2pt 5pt 2pt",
                boxSizing: "border-box",
                margin: "0",
              }}
            >
              <h4 style={{ margin: "0 0 3pt" }}>فروشگاه جهان ساتراپ</h4>
              <p style={{ margin: "0 0 3pt" }}>تلفن: 04136606800</p>
              <p style={{ margin: "0" }}>
                آدرس: تبریز، ضلع جنوب غربی میدان فهمیده، مجتمع تفریحی ورزشی،جهان
                ساتراپ
              </p>
              <h5 style={{ textAlign: "right", margin: "0.8rem 0 0.3rem 0" }}>
                کاربر صندوق: {!!dataPrint && dataPrint.CreatorName}
              </h5>
              <h5 style={{ textAlign: "right", margin: "0.8rem 0 0.3rem 0" }}>
                مشتری: {!!dataPrint && dataPrint.Person.FullNameFa}
              </h5>
              <h5 style={{ textAlign: "right", margin: "0.3rem 0 0" }}>
                شماره فاکتور: {!!dataPrint && dataPrint.SellDocumentId}
              </h5>
              <h5 style={{ textAlign: "right", margin: "0.3rem 0 0" }}>
                تاریخ ثبت فاکتور:
                <span
                  style={{
                    display: "inline-block",
                    textAlign: "right",
                    direction: "ltr",
                  }}
                >
                  {!!dataPrint &&
                    !!dataPrint.CreationDate &&
                    moment(dataPrint.CreationDate, "YYYY-MM-DDTHH:mm:ss")
                      .locale(process.env.REACT_APP_DATE)
                      .format("YYYY/MM/DD - HH:mm")}
                </span>
              </h5>
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
          <div>
            <table
              className="sell-detail table table-bordered border-dark text-black"
              style={{ borderSpacing: "0", direction: "rtl", width: "100%" }}
              >
              <thead>
                <tr  style={{borderTop: "2px solid #000"}}>
                  {/* <th className="border-dark" style={{ width: "5%" }}>
                    <div style={{ transform: "rotate(90deg)" }}>ردیف</div>
                  </th> */}
                  <th colSpan={5} className="border-dark" style={{ width: "85%" }}>
                    کالا
                  </th>
                  <th colSpan={1} className="border-dark" style={{ width: "15%" }}>
                  تعداد
                  </th>
                  </tr>
                  <tr style={{borderBottom: "2px solid #000"}}>
                  <th colSpan={2} className="border-dark" style={{ width: "34%" }}>
                  قیمت روی کالا
                  </th>
                  <th colSpan={2} className="border-dark" style={{ width: "33%" }}>
                  قیمت فروشگاه
                  </th>
                  <th colSpan={2} className="border-dark" style={{ width: "33%" }}>
                  قابل پرداخت
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {!!dataPrint &&
                  dataPrint.SellDocumentDetails.length &&
                  dataPrint.SellDocumentDetails.map((x, i) => (
                    <>
                    <tr style={{borderBottom: "1px solid #555"}} key={x.SellDocumentDetailId}>
                      {/* <td className="text-center border-dark">{i + 1}</td> */}
                      <td colSpan={5} className="border-dark">{x.ProductName}</td>
                      <td colSpan={1} className="text-center border-dark">{x.Amount}</td>
                      </tr>
                      <tr  style={{borderBottom: "2px solid #000"}}>
                      <td colSpan={2} className="text-center border-dark">
                        {numberWithCommas(x.Price)}
                      </td>
                      <td colSpan={2} className="text-center border-dark">
                      {numberWithCommas(x.StoredPrice)}
                      </td>
                      <td colSpan={2} className="border-dark">
                        {numberWithCommas(x.FinalPrice)}
                      </td>
                    </tr>
                    </>
                  ))}
                <tr>
                  <td className="border-dark" colSpan="6">
                    تعداد اقلام ثبت شده در فاکتور:{" "}
                    {!!dataPrint
                      ? "      " + dataPrint.SellDocumentDetails.length
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td className="border-dark" colSpan="6">
                    <div
                      style={{
                        width: "64%",
                        float: "right",
                        fontSize: "1.2rem",
                      }}
                    >
                      جمع کل قبل از کسر تخفیف (ریال):
                      <br />
                      سود شماز از این خرید (ریال):
                      <hr />
                      {!!dataPrint.BonPrice ||
                        !!dataPrint.PointPrice ||
                        !!dataPrint.CreditPrice ||
                        !!dataPrint.WalletPrice? (
                          <>
                            آپشن‌ها:
                            {!!dataPrint && !!dataPrint.BonPrice && (<><br /><span className="pl-5">بن: </span></>)}
                            {!!dataPrint && !!dataPrint.PointPrice && (<><br /><span className="pl-5">امتیاز: </span></>)}
                            {!!dataPrint && !!dataPrint.CreditPrice && (<><br /><span className="pl-5">اعتبار: </span></>)}
                            {!!dataPrint && !!dataPrint.WalletPrice && (<><br /><span className="pl-5">کیف پول: </span></>)}
                            <hr />
                          </>
                        ):(<></>)}
                      <b>مبلغ قابل پرداخت (ریال):</b>
                      {!!dataPrint && dataPrint.BeforePayablePrice && (
                        <>
                          <br />
                          مابه‌التفاوت فاکتور قبل (ریال):
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        width: "34%",
                        float: "left",
                        fontSize: "1.2rem",
                      }}
                    >
                      {!!dataPrint && numberWithCommas(dataPrint.Price)}
                      <br />
                      {!!dataPrint && numberWithCommas(dataPrint.SavedMoney)}
                      <hr />

                      {!!dataPrint.BonPrice ||
                        !!dataPrint.PointPrice ||
                        !!dataPrint.CreditPrice ||
                        !!dataPrint.WalletPrice? (
                          <>
                            {!!dataPrint && !!dataPrint.BonPrice && (<><br />{numberWithCommas(+dataPrint.BonPrice)}</>)}
                            {!!dataPrint && !!dataPrint.PointPrice && (<><br />{numberWithCommas(+dataPrint.PointPrice)}</>)}
                            {!!dataPrint && !!dataPrint.CreditPrice && (<><br />{numberWithCommas(+dataPrint.CreditPrice)}</>)}
                            {!!dataPrint && !!dataPrint.WalletPrice && (<><br />{numberWithCommas(+dataPrint.WalletPrice)}</>)}
                            <hr />
                          </>
                        ):(<></>)}
                      <b>
                        {!!dataPrint &&
                          numberWithCommas(
                            dataPrint.PayablePrice -
                            +dataPrint.BonPrice -
                            +dataPrint.WalletPrice -
                            +dataPrint.PointPrice -
                            +dataPrint.CreditPrice
                          )}
                      </b>
                      {!!dataPrint && dataPrint.BeforePayablePrice && (
                        <>
                          <br />
                        {numberWithCommas(+dataPrint.Price - +dataPrint.BeforePayablePrice)}
                        </>
                      )}
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="border-dark text-center">
                    {!!dataPrint && (
                      <Barcode
                        height={20}
                        width={1}
                        marginLeft={5}
                        marginRight={5}
                        marginTop={2}
                        marginBottom={2}
                        fontSize={14}
                        displayValue={false}
                        key={!!dataPrint ? dataPrint.SellDocumentId : ""}
                        value={!!dataPrint ? dataPrint.SellDocumentId : ""}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="text-center border-dark">
                    RoshaSoft.ir
                    <br />
                    گروه نرم‌افزاری نوت
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
});
