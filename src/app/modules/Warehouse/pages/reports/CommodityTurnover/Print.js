import React, { useState, useEffect } from "react";
import _ from "lodash";
import { EnToFaDateSlash } from "src/core/_helpers";
import moment from "jalali-moment";

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

  const DateStyle = {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: "1rem"
  }

  return (
    <>
      <div ref={ref} style={{ margin: "1rem" }}>

      <div style={DateStyle}>
        <h3>
          {filterPrint && !!filterPrint.FromDate && ("از تاریخ: " + EnToFaDateSlash(filterPrint.FromDate))}
        </h3>
        <h3>
          {filterPrint && !!filterPrint.ToDate && ("تا تاریخ : " + EnToFaDateSlash(filterPrint.ToDate))}
        </h3>
      </div>

        <table
          className="commodityTurnover-detail table table-bordered border-dark"
          style={{
            borderSpacing: "0",
            direction: "rtl",
            width: "100%",
            border: "none",
          }}
        >
          <thead style={{ backgroundColor: "#ccc" }}>
            <tr>
              <th className="border-dark" style={{ width: "10%" }}>
                کد
              </th>
              <th className="border-dark" style={{ width: "15%" }}>
                نام آیتم
              </th>
              <th className="border-dark" style={{ width: "5%" }}>
                تعداد وارده
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                فی وارده
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                جمع وارده
              </th>
              <th className="border-dark" style={{ width: "5%" }}>
                تعداد صادره
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                فی صادره
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                جمع صادره
              </th>
              <th className="border-dark" style={{ width: "5%" }}>
                تعداد مانده
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                فی مانده
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                جمع ماده
              </th>
            </tr>
          </thead>
          <tbody>
            {!!dataPrint &&
              dataPrint.Items.length > 0 &&
              dataPrint.Items.map((x, i) => (
                
                <>
                  <tr key={x.Date}>
                    <td className="border-dark ltr text-center">
                      {x.ProductCode}
                    </td>
                    <td className="border-dark ltr text-center">{x.ProductTitle}</td>
                    <td className="border-dark text-center">{x.ArrivalAmount}</td>
                    <td className="border-dark ltr text-center">
                      {x.ArrivalPrice}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.ArrivalSum}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.OutgoAmount}
                    </td>
                    <td className="border-dark ltr text-center"> 
                      {x.OutgoPrice}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.OutgoSum}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.RemainingAmount}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.RemainingPrice}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.RemainingSum}
                    </td>
                  </tr>
                </>
              ))}
            <tr>
              <td colSpan="11" className="text-center border-dark">
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
