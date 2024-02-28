import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuItemsTable } from "./RestaurantMenuItems-table/RestaurantMenuItemsTable";
import {
  useRestaurantMenuItemsUIContext,
  RestaurantMenuItemsUIConsumer,
} from "./RestaurantMenuItemsUIContext";
import { useReactToPrint } from "../../../../../core/_helpers/Print";
import { getAllRestaurantMenuItems } from "../../_redux/RestaurantMenuItems/RestaurantMenuItemsCrud";
import { PrintMenu } from "./print-menu/PrintMenu";
export function RestaurantMenuItemsCard() {
  const { t } = useTranslation();
  const [printing, setPrinting] = useState(false);

  const restaurantMenuItemsUIContext = useRestaurantMenuItemsUIContext();
  const restaurantMenuItemsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemsUIContext.ids,
      queryParams: restaurantMenuItemsUIContext.queryParams,
      setQueryParams: restaurantMenuItemsUIContext.setQueryParams,
      newRestaurantMenuItemButtonClick:
        restaurantMenuItemsUIContext.newRestaurantMenuItemButtonClick,
      openDeleteRestaurantMenuItemsDialog:
        restaurantMenuItemsUIContext.openDeleteRestaurantMenuItemsDialog,
      openEditRestaurantMenuItemPage:
        restaurantMenuItemsUIContext.openEditRestaurantMenuItemPage,
      openUpdateRestaurantMenuItemsStatusDialog:
        restaurantMenuItemsUIContext.openUpdateRestaurantMenuItemsStatusDialog,
      openFetchRestaurantMenuItemsDialog:
        restaurantMenuItemsUIContext.openFetchRestaurantMenuItemsDialog,
    };
  }, [restaurantMenuItemsUIContext]);

  const [printModel, setPrintModel] = useState(null);
  const Print = () => {
    setPrinting(true);

    getAllRestaurantMenuItems()
      .then((res) => {
        setPrintModel(res.data.Items);
        setTimeout(() => {
          setPrinting(false);
          handlePrint();
        }, 500);
      })
      .catch(() => {
        setPrinting(false);
      });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 210mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });

  return (
    <>
      <Card>
        <CardHeader
          title={t("Common.List") + " " + t("RestaurantMenuItem.Entity")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary mr-3"
              onClick={Print}
              disabled={printing}
            >
              {t("Common.Print")} {t("Common.Menu")}{" "}
              {printing && <i className="fad fa-spinner-third fa-spin"></i>}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={
                restaurantMenuItemsUIProps.newRestaurantMenuItemButtonClick
              }
            >
              {t("RestaurantMenuItem.Entity")} {t("Common.New")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <RestaurantMenuItemsUIConsumer>
            {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
          </RestaurantMenuItemsUIConsumer>
          <RestaurantMenuItemsTable />
        </CardBody>
      </Card>
      <div style={{ display: "none", height: "auto" }}>
        <PrintMenu ref={componentRef} data={printModel} />
      </div>
    </>
  );
}
