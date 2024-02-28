import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useRestaurantMenuItemPricesUIContext } from "./RestaurantMenuItemPricesUIContext";
import {
  DateFaColumnFormatter,
  MoneyColumnFormatter,
} from "../../../../../../core/_formatters";

export function RestaurantMenuItemPricesTable() {
  const { t } = useTranslation();
  const restaurantMenuItemPricesUIContext =
    useRestaurantMenuItemPricesUIContext();
  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      restaurantMenuItemPrices:
        restaurantMenuItemPricesUIContext.restaurantMenuItemPrices,
      activeRestaurantMenuItemPrices:
        restaurantMenuItemPricesUIContext.activeRestaurantMenuItemPrices,
      openEditRestaurantMenuItemPriceDialog:
        restaurantMenuItemPricesUIContext.openEditRestaurantMenuItemPriceDialog,
      openSerialRestaurantMenuItemPriceDialog:
        restaurantMenuItemPricesUIContext.openSerialRestaurantMenuItemPriceDialog,
      openDeleteRestaurantMenuItemPriceDialog:
        restaurantMenuItemPricesUIContext.openDeleteRestaurantMenuItemPriceDialog,
    };
  }, [restaurantMenuItemPricesUIContext]);

  const columns = [
    {
      dataField: "Price",
      text: t("RestaurantMenuItemPrice.Price"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "ActiveDate",
      text: t("RestaurantMenuItemPrice.ActiveDate"),
      sort: false,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemPriceDialog:
          restaurantMenuItemPricesUIProps.openEditRestaurantMenuItemPriceDialog,
        openDeleteRestaurantMenuItemPriceDialog:
          restaurantMenuItemPricesUIProps.openDeleteRestaurantMenuItemPriceDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  console.log(
    "activeRestaurantMenuItemPrices > ",
    restaurantMenuItemPricesUIProps.activeRestaurantMenuItemPrices
  );
  return (
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="RestaurantMenuItemPriceId"
        data={
          restaurantMenuItemPricesUIProps.activeRestaurantMenuItemPrices ===
          null
            ? []
            : restaurantMenuItemPricesUIProps.activeRestaurantMenuItemPrices
        }
        columns={columns}
      >
        <PleaseWaitMessage
          entities={
            restaurantMenuItemPricesUIProps.activeRestaurantMenuItemPrices
          }
        />
        <NoRecordsFoundMessage
          entities={
            restaurantMenuItemPricesUIProps.activeRestaurantMenuItemPrices
          }
        />
      </BootstrapTable>
    </>
  );
}
