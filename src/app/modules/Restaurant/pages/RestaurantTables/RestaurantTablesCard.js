
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantTablesTable } from "./restaurantTables-table/RestaurantTablesTable";
import { useRestaurantTablesUIContext, RestaurantTablesUIConsumer } from "./RestaurantTablesUIContext";
import { useTranslation } from 'react-i18next';

export function RestaurantTablesCard() {
  const { t } = useTranslation();

  const restaurantTablesUIContext = useRestaurantTablesUIContext();

  const restaurantTablesUIProps = useMemo(() => {
    return {
      ids: restaurantTablesUIContext.ids,
      queryParams: restaurantTablesUIContext.queryParams,
      setQueryParams: restaurantTablesUIContext.setQueryParams,
      newRestaurantTableButtonClick: restaurantTablesUIContext.newRestaurantTableButtonClick,
      openDeleteRestaurantTablesDialog: restaurantTablesUIContext.openDeleteRestaurantTablesDialog,
      openEditRestaurantTablePage: restaurantTablesUIContext.openEditRestaurantTablePage,
      openUpdateRestaurantTablesStatusDialog: restaurantTablesUIContext.openUpdateRestaurantTablesStatusDialog,
      openFetchRestaurantTablesDialog: restaurantTablesUIContext.openFetchRestaurantTablesDialog,
    };
  }, [restaurantTablesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RestaurantTable.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantTablesUIProps.newRestaurantTableButtonClick}
          >
            {t("RestaurantTable.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantTablesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantTablesUIConsumer>
        <RestaurantTablesTable />
      </CardBody>
    </Card>
  );
}