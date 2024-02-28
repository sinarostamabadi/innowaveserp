import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuItemPricesTable } from "./restaurantMenuItemPrices-table/RestaurantMenuItemPricesTable";
import {
  useRestaurantMenuItemPricesUIContext,
  RestaurantMenuItemPricesUIConsumer,
} from "./RestaurantMenuItemPricesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemPricesCard() {
  const { t } = useTranslation();

  const restaurantMenuItemPricesUIContext =
    useRestaurantMenuItemPricesUIContext();

  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemPricesUIContext.ids,
      queryParams: restaurantMenuItemPricesUIContext.queryParams,
      setQueryParams: restaurantMenuItemPricesUIContext.setQueryParams,
      newRestaurantMenuItemPriceButtonClick:
        restaurantMenuItemPricesUIContext.newRestaurantMenuItemPriceButtonClick,
      openDeleteRestaurantMenuItemPricesDialog:
        restaurantMenuItemPricesUIContext.openDeleteRestaurantMenuItemPricesDialog,
      openEditRestaurantMenuItemPricePage:
        restaurantMenuItemPricesUIContext.openEditRestaurantMenuItemPricePage,
      openUpdateRestaurantMenuItemPricesStatusDialog:
        restaurantMenuItemPricesUIContext.openUpdateRestaurantMenuItemPricesStatusDialog,
      openFetchRestaurantMenuItemPricesDialog:
        restaurantMenuItemPricesUIContext.openFetchRestaurantMenuItemPricesDialog,
    };
  }, [restaurantMenuItemPricesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantMenuItemPrice.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantMenuItemPricesUIProps.newRestaurantMenuItemPriceButtonClick
            }
          >
            {t("RestaurantMenuItemPrice.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantMenuItemPricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantMenuItemPricesUIConsumer>
        <RestaurantMenuItemPricesTable />
      </CardBody>
    </Card>
  );
}
