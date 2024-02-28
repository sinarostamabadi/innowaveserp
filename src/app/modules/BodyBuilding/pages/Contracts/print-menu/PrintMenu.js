import React, { useState, useEffect } from "react";
import _ from "lodash";
var Barcode = require("react-barcode");

export const PrintMenu = React.forwardRef(({ data }, ref) => {
  const [dataPrint, setDataPrint] = useState(data);
  useEffect(() => {
    if (!!data) {
      let sorted = _.orderBy(
        data,
        [
          "PlaceOfPreparation.Title",
          "RestaurantMenuGroup.Title",
          "BodyBuildingContract.NameFa",
        ],
        ["asc", "asc", "asc"]
      );
      let menus = _.groupBy(sorted, (menu) => menu.PlaceOfPreparation.Title);
      for (const key in menus) {
        if (menus.hasOwnProperty(key)) {
          menus[key] = _.groupBy(
            menus[key],
            (x) => x.RestaurantMenuGroup.Title
          );
        }
      }

      setDataPrint(menus);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function renderMenu(menu) {
    return renderPlace(menu);
  }

  function renderPlace(placeMenu) {
    let placeHtml = [];
    for (const key in placeMenu) {
      if (placeMenu.hasOwnProperty(key)) {
        const place = placeMenu[key];
        placeHtml.push(
          <div>
            <h2 className="text-center">{key}</h2>
            <div>{renderGroup(place)}</div>
          </div>
        );
      }
    }

    return placeHtml;
  }

  function renderGroup(menuGroup) {
    let groupHtml = [];
    for (const key in menuGroup) {
      if (menuGroup.hasOwnProperty(key)) {
        const group = menuGroup[key];
        groupHtml.push(
          <div style={{ marginBottom: "2rem", borderTop: "1.5px solid #000" }}>
            <h3 style={{ paddingRight: "1.5rem" }} className="text-right">
              {key}
            </h3>
            <div style={{ paddingRight: "1.5rem" }}>{renderBarcode(group)}</div>
          </div>
        );
      }
    }

    return groupHtml;
  }

  function renderBarcode(menuItem) {
    return menuItem.map((model) => (
      <div
        style={{
          border: "1px solid #000",
          width: "19.5%",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        <div className="fs-25">{model.NameFa}</div>
        <Barcode
          height={30}
          width={1}
          marginLeft={5}
          marginRight={5}
          marginTop={2}
          displayValue={false}
          key={model.BodyBuildingContractId}
          value={model.BodyBuildingContractId.toString().padStart(6, "0")}
        />
      </div>
    ));
  }

  return (
    <div ref={ref}>
      <div
        className="bill rtl"
        style={{
          direction: "rtl",
          backgroundColor: "#fff",
          width: "100%",
          padding: "0",
          margin: 0,
        }}
      >
        <div>{!!dataPrint == true ? renderMenu(dataPrint) : <></>}</div>
      </div>
    </div>
  );
});
