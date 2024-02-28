import React, { useState, useEffect } from "react";
import _ from "lodash";
import { EnToFaDateSlash } from "src/core/_helpers";
import moment from "jalali-moment";

export const Print = React.forwardRef(({ data, filters, product }, ref) => {
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
        <h3 className="text-center">Cardex report</h3>

        <h4>{`${moment().format("jYYYY/jMM/jDD")} :Report date`}</h4>

        <div style={{ display: "flex", justifyContent: "right" }}>
          <h4>{`Product Name: ${product}`}</h4>
          <h4 style={{ marginLeft: "5rem" }}>
            {!!filterPrint && `Product code: ${filterPrint.ProductId}`}
          </h4>
        </div>

        <table
          className="cardex-detail table table-bordered border-dark"
          style={{
            borderSpacing: "0",
            direction: "rtl",
            width: "100%",
            border: "none",
          }}
        >
          <thead style={{ backgroundColor: "#ccc" }}>
            <tr>
              <th className="border-dark" style={{ width: "7%" }}>
                Date
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                Form type
              </th>
              <th className="border-dark" style={{ width: "10%" }}>
                Form number
              </th>
              <th className="border-dark" style={{ width: "12%" }}>
                Entrance to the warehouse
              </th>
              <th className="border-dark" style={{ width: "12%" }}>
                Exit from the warehouse
              </th>
              <th className="border-dark" style={{ width: "12%" }}>
                Remaining in stock
              </th>
              <th className="border-dark" style={{ width: "7%" }}>
                Unit
              </th>
              <th className="border-dark" style={{ width: "12%" }}>
                Description
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
                      {EnToFaDateSlash(x.Date)}
                    </td>
                    <td className="border-dark ltr text-center">{x.Type}</td>
                    <td className="border-dark text-center">{x.Number}</td>
                    <td className="border-dark ltr text-center">
                      {x.ReceiptAmount}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.AssignmentAmount}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.RemainingAmount}
                    </td>
                    <td className="border-dark ltr text-center">
                      {x.ProductUnit}
                    </td>
                    <td className="border-dark ltr text-center">{x.Des}</td>
                  </tr>
                </>
              ))}
            <tr>
              <td colSpan="9" className="text-center border-dark">
                Futurewavesco.com
                <br />
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});
