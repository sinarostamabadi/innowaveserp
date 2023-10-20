import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import "./PrintLabel.css";
import { numberWithCommas } from "../../../../../../core/_helpers/MoneyUtiles";
var Barcode = require("react-barcode");

export const PrintLabel = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);

  useEffect(() => {
    setDataPrint(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function getBarcode(model) {
    console.log("model  > ", model);
    // if(model.Code.length > 5)
      return model.Code
    // else 
    //   return model.ProductGroup.FullCode + "" + model.Code
  }

  function labels(label) {
    let labelBarcodes = [];
    let rowLbl = 0;
    for (let index = 0; index < +label.Count; index++) {
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
          <p style={{ fontSize: "10pt", margin: "1rem" }}>
            {label.ProductId[0].Name}
          </p>
          <Barcode
            height={30}
            width={1}
            marginLeft={5}
            marginRight={5}
            marginTop={2}
            fontSize={14}
            key={getBarcode(label.ProductId[0])}
            value={getBarcode(label.ProductId[0])}
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

  console.log(" data> ", data);
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
      <div>{!!dataPrint && +dataPrint.Count > 0 && labels(dataPrint)}</div>
    </div>
  );
});
