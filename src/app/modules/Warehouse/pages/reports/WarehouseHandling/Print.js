import React, { useState, useEffect } from "react";
import _ from "lodash";
var Barcode = require("react-barcode");

export const Print = React.forwardRef(({ data, filters, warehouse }, ref) => {
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

  const card = {
    padding: "0",
    width: "50%",
    margin: "0",
    height: "30mm",
    overflow: "hidden"
  }
  const container = {
    border:"2px solid black",
    direction: "rtl",
    flex: "0 0 auto",
    paddingTop: "0.5rem",
    height: "100%"
  }
  const counter = {
    display:"flex",
    marginBottom:"1rem"
  }
  const input = {
    marginRight: "1rem",
    alignSelf: "center",
    height: "2.5rem",
    border: "solid 1px black"
  }

  return (
     <div ref={ref} style={{ margin: "0", display: "flex",flexDirection: "row-reverse",flexWrap: "wrap"}}>
      {!!dataPrint &&
        dataPrint.Items.length > 0 &&
        dataPrint.Items.map((x, i) => (
          <>
              <div style={card}>
                <div style={container}>
                  <div style={{textAlign: "center"}}>
                  <Barcode
                    height={25}
                    width={1}
                    marginLeft={5}
                    marginRight={5}
                    marginTop={2}
                    marginBottom={0}
                    fontSize={14}
                    key={x.ProductCode}
                    value={x.ProductCode}
                  />
                  </div>
                  <div style={{padding: "0 0.5rem 0.5rem 0.5rem"}}>
                    <div style={{maxWidth: "100%", maxHeight: "1.5rem", overflow: "hidden"}}>{x.ProductName}</div>
                    <div style={{width: "50%", float: "right", margin: "0.5rem 0"}}>گروه: {x.ProductGroupName}</div>
                        <div style={{width: "15%", float: "right", margin: "0.5rem 0"}}>تعداد:</div>
                        <div style={{width: "33%", float: "left", border: "1px solid #000", margin: "0.5rem 0"}}>&nbsp;</div>
                      <div style={{clear: "both"}}></div>
                  </div>
                </div>
              </div>
          </>
        ))}
      </div> 
  );
});