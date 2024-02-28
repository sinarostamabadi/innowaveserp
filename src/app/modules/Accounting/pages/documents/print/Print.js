import React, { useState, useEffect } from "react";
import _ from "lodash";
import { numberWithCommas } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";

export const PrintReport = React.forwardRef(({ data }, ref) => {
  const { t } = useTranslation();
  const [dataPrint, setDataPrint] = useState(data);

  useEffect(() => {
    if (!!data) {
      setDataPrint(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="docprint" ref={ref} style={{ margin: "0 3rem 3rem" }}>
        {!!dataPrint && (
          <table className="report" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th className="head" style={{ width: "5%" }}>
                  ردیف
                </th>
                <th className="head" style={{ width: "10%" }}>
                  کد حساب
                  <br />
                  کد تفصیلی‌ها
                </th>
                <th className="head" style={{ width: "35%" }}>
                  نام حساب
                  <br />
                  نام تفصیلی‌ها
                  <br />
                  شرح عملیات
                </th>
                <th className="head" style={{ width: "25%" }}>
                  مبلغ بدهکار
                </th>
                <th className="head" style={{ width: "25%" }}>
                  مبلغ بستانکار
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPrint.DocumentDtls.map((item, index) => (
                <tr key={index}>
                  <td className="text-black">{index + 1}</td>
                  <td className="text-black">
                    {item.Account.Code}
                    <br />
                    {item.AccountFloating.Code}
                  </td>
                  <td className="text-black">
                    {item.Account.Title}
                    <br />
                    {item.AccountFloating.Title}
                    <br />
                    {item.Des}
                  </td>
                  <td className="text-black">{numberWithCommas(item.Bed)}</td>
                  <td className="text-black">{numberWithCommas(item.Bes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
});
