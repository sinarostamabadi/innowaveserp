import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../../../../../../core/_helpers/MoneyUtiles";
var Barcode = require("react-barcode");

export const PrintLabel = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);

  useEffect(() => {
    setDataPrint(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function labels(label) {
    console.log("label > ", label);
    let labelBarcodes = [];
    let rowLbl = 0;
    for (let index = 0; index < label.length; index++) {
    console.log("label[index] > ", label[index]);

      rowLbl++;
      labelBarcodes.push(
        <div
          style={{
            margin: "0.5mm",
            float: rowLbl == 1 ? "left" : "right",
            width: "49mm",
            height: "30mm",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "9pt", margin: "1rem", overflow: "hidden", lineHeight: "2.5rem", height: "2.5rem" }}>
            {label[index].Product.Name}
          </div>
          <h4 style={{ fontSize: "14pt", margin: "1rem",direction: "rtl" }}>{numberWithCommas(label[index].Price)}<span style={{fontSize: "2rem", fontWeight: "normal", marginRight: "0.5rem"}}>ریال</span></h4>
          <Barcode
            height={20}
            width={1}
            marginLeft={5}
            marginRight={5}
            marginTop={2}
            fontSize={14}
            key={label[index].Product.Code}
            value={label[index].Product.Code}
          />
        </div>
      );
      if (rowLbl == 2) {
        labelBarcodes.push(
          <div
            style={{ clear: "both", height: "1.8mm" }}
            className="page-break-after"
          ></div>
        );
        rowLbl = 0;
      }
    }
    if (rowLbl != 0)
      labelBarcodes.push(
        <div style={{ clear: "both" }} className="page-break-after"></div>
      );

    return labelBarcodes;
  }

  console.log(" dataPrint> ", dataPrint);
  return (
    <div
      ref={ref}
      style={{
        width: "103mm",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
      className="page-break-after"
    >
      <div>{!!dataPrint && dataPrint.length > 0 && labels(dataPrint)}</div>
    </div>
  );
});
