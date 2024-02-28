import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuItemRatesTable } from "./restaurantMenuItemRates-table/RestaurantMenuItemRatesTable";
import {
  useRestaurantMenuItemRatesUIContext,
  RestaurantMenuItemRatesUIConsumer,
} from "./RestaurantMenuItemRatesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemRatesCard() {
  const { t } = useTranslation();

  const restaurantMenuItemRatesUIContext =
    useRestaurantMenuItemRatesUIContext();

  const restaurantMenuItemRatesUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemRatesUIContext.ids,
      queryParams: restaurantMenuItemRatesUIContext.queryParams,
      setQueryParams: restaurantMenuItemRatesUIContext.setQueryParams,
      newRestaurantMenuItemRateButtonClick:
        restaurantMenuItemRatesUIContext.newRestaurantMenuItemRateButtonClick,
      openDeleteRestaurantMenuItemRatesDialog:
        restaurantMenuItemRatesUIContext.openDeleteRestaurantMenuItemRatesDialog,
      openEditRestaurantMenuItemRatePage:
        restaurantMenuItemRatesUIContext.openEditRestaurantMenuItemRatePage,
      openUpdateRestaurantMenuItemRatesStatusDialog:
        restaurantMenuItemRatesUIContext.openUpdateRestaurantMenuItemRatesStatusDialog,
      openFetchRestaurantMenuItemRatesDialog:
        restaurantMenuItemRatesUIContext.openFetchRestaurantMenuItemRatesDialog,
    };
  }, [restaurantMenuItemRatesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantMenuItemRate.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantMenuItemRatesUIProps.newRestaurantMenuItemRateButtonClick
            }
          >
            {t("RestaurantMenuItemRate.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantMenuItemRatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantMenuItemRatesUIConsumer>
        <RestaurantMenuItemRatesTable />
      </CardBody>
    </Card>
  );
}
