
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantCostTypesTable } from "./restaurantCostTypes-table/RestaurantCostTypesTable";
import { useRestaurantCostTypesUIContext, RestaurantCostTypesUIConsumer } from "./RestaurantCostTypesUIContext";
import { useTranslation } from 'react-i18next';

export function RestaurantCostTypesCard() {
  const { t } = useTranslation();

  const restaurantCostTypesUIContext = useRestaurantCostTypesUIContext();

  const restaurantCostTypesUIProps = useMemo(() => {
    return {
      ids: restaurantCostTypesUIContext.ids,
      queryParams: restaurantCostTypesUIContext.queryParams,
      setQueryParams: restaurantCostTypesUIContext.setQueryParams,
      newRestaurantCostTypeButtonClick: restaurantCostTypesUIContext.newRestaurantCostTypeButtonClick,
      openDeleteRestaurantCostTypesDialog: restaurantCostTypesUIContext.openDeleteRestaurantCostTypesDialog,
      openEditRestaurantCostTypePage: restaurantCostTypesUIContext.openEditRestaurantCostTypePage,
      openUpdateRestaurantCostTypesStatusDialog: restaurantCostTypesUIContext.openUpdateRestaurantCostTypesStatusDialog,
      openFetchRestaurantCostTypesDialog: restaurantCostTypesUIContext.openFetchRestaurantCostTypesDialog,
    };
  }, [restaurantCostTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RestaurantCostType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantCostTypesUIProps.newRestaurantCostTypeButtonClick}
          >
            {t("RestaurantCostType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantCostTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantCostTypesUIConsumer>
        <RestaurantCostTypesTable />
      </CardBody>
    </Card>
  );
}