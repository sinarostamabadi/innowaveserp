import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantDiscountTypesTable } from "./RestaurantDiscountTypes-table/RestaurantDiscountTypesTable";
import {
  useRestaurantDiscountTypesUIContext,
  RestaurantDiscountTypesUIConsumer,
} from "./RestaurantDiscountTypesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantDiscountTypesCard() {
  const { t } = useTranslation();

  const restaurantDiscountTypesUIContext =
    useRestaurantDiscountTypesUIContext();

  const restaurantDiscountTypesUIProps = useMemo(() => {
    return {
      ids: restaurantDiscountTypesUIContext.ids,
      queryParams: restaurantDiscountTypesUIContext.queryParams,
      setQueryParams: restaurantDiscountTypesUIContext.setQueryParams,
      newRestaurantDiscountTypeButtonClick:
        restaurantDiscountTypesUIContext.newRestaurantDiscountTypeButtonClick,
      openDeleteRestaurantDiscountTypesDialog:
        restaurantDiscountTypesUIContext.openDeleteRestaurantDiscountTypesDialog,
      openEditRestaurantDiscountTypePage:
        restaurantDiscountTypesUIContext.openEditRestaurantDiscountTypePage,
      openUpdateRestaurantDiscountTypesStatusDialog:
        restaurantDiscountTypesUIContext.openUpdateRestaurantDiscountTypesStatusDialog,
      openFetchRestaurantDiscountTypesDialog:
        restaurantDiscountTypesUIContext.openFetchRestaurantDiscountTypesDialog,
    };
  }, [restaurantDiscountTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantDiscountType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantDiscountTypesUIProps.newRestaurantDiscountTypeButtonClick
            }
          >
            {t("RestaurantDiscountType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantDiscountTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantDiscountTypesUIConsumer>
        <RestaurantDiscountTypesTable />
      </CardBody>
    </Card>
  );
}
