import React, { useState, useEffect } from "react";
import _ from "lodash";
import { CloneObject, numberWithCommas } from "src/core/_helpers";
import { EnToFaDateSlash } from "src/core/_helpers";
import moment from "jalali-moment";

export const Print = React.forwardRef(({ data, filters, product }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  const [filterPrint, setFilterPrint] = useState(filters);

  const serialStyle ={
    height: "3rem",
    marginRight:"2rem",
    float: "left",
    border: "solid 1px black"
  }
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
        <div style={{display: "flex", justifyContent: "right"}}>
          <div style={{marginRight: "auto"}}>
            <h2>
            <input type="text" style={serialStyle} />
              :شماره سریال
            </h2>
          </div>
          <h2 className="text-center">گزارش گردش موجودی روزانه انبار (کارت انبار)</h2>
        </div>

        <table
          className="InventoryOnTotal-detail table table-bordered border-dark"
          style={{
            borderSpacing: "0",
            direction: "rtl",
            width: "100%",
            border: "none",
          }}
        >
          <tr>
            <td className="border-dark" style={{display: "flex", justifyContent: "center"}}>
              <div>
                گزارش گردش موجودي روزانه انبار (كارت انبار)
              </div>

              <div style={{marginRight: "20%"}}>{`تاريخ: ${moment().format('jYYYY/jMM/jDD')}`}</div>
            </td>
          </tr>
        </table>

        <table
          className="InventoryOnTotal-detail table table-bordered border-dark"
          style={{
            borderSpacing: "0",
            direction: "rtl",
            width: "100%",
            border: "none",
          }}
        >
          <thead style={{ backgroundColor: "#ccc" }}>
            <tr>
              <th className="border-dark" style={{ width: "5%" }}>
                ردیف
              </th>
              <th className="border-dark" style={{ width: "56%" }}>
                نام كالا
              </th>
              <th className="border-dark" style={{ width: "13%" }}>
                ورودي
              </th>
              <th className="border-dark" style={{ width: "13%" }}>
                خروجي
              </th>
              <th className="border-dark" style={{ width: "13%" }}>
                مانده
              </th>
            </tr>
          </thead>
          <tbody>
            {!!dataPrint &&
              dataPrint.Items.length > 0 &&
              dataPrint.Items.map((x, i) => (
                <>
                  <tr>
                    <td className="border-dark ltr text-center">
                      {++i}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.ProductName}
                    </td>
                    <td className="border-dark text-center">{x.ArrivalAmount}</td>
                    <td className="border-dark ltr text-center">
                      {x.OutgoAmount}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.RemainingAmount}
                    </td>
                  </tr>
                </>
              ))}
            <tr>
              <td colSpan="9" className="text-center border-dark">
                RoshaSoft.ir
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
