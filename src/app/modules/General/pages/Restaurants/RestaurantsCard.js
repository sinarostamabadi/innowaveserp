import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantsTable } from "./restaurants-table/RestaurantsTable";
import {
  useRestaurantsUIContext,
  RestaurantsUIConsumer,
} from "./RestaurantsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantsCard() {
  const { t } = useTranslation();

  const restaurantsUIContext = useRestaurantsUIContext();

  const restaurantsUIProps = useMemo(() => {
    return {
      ids: restaurantsUIContext.ids,
      queryParams: restaurantsUIContext.queryParams,
      setQueryParams: restaurantsUIContext.setQueryParams,
      newRestaurantButtonClick: restaurantsUIContext.newRestaurantButtonClick,
      openDeleteRestaurantsDialog:
        restaurantsUIContext.openDeleteRestaurantsDialog,
      openEditRestaurantPage: restaurantsUIContext.openEditRestaurantPage,
      openUpdateRestaurantsStatusDialog:
        restaurantsUIContext.openUpdateRestaurantsStatusDialog,
      openFetchRestaurantsDialog:
        restaurantsUIContext.openFetchRestaurantsDialog,
    };
  }, [restaurantsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Restaurant.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantsUIProps.newRestaurantButtonClick}
          >
            {t("Restaurant.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantsUIConsumer>
        <RestaurantsTable />
      </CardBody>
    </Card>
  );
}
