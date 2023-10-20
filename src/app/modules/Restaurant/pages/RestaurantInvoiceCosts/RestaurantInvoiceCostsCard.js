
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantInvoiceCostsTable } from "./restaurantInvoiceCosts-table/RestaurantInvoiceCostsTable";
import { useRestaurantInvoiceCostsUIContext, RestaurantInvoiceCostsUIConsumer } from "./RestaurantInvoiceCostsUIContext";
import { useTranslation } from 'react-i18next';

export function RestaurantInvoiceCostsCard() {
  const { t } = useTranslation();

  const restaurantInvoiceCostsUIContext = useRestaurantInvoiceCostsUIContext();

  const restaurantInvoiceCostsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceCostsUIContext.ids,
      queryParams: restaurantInvoiceCostsUIContext.queryParams,
      setQueryParams: restaurantInvoiceCostsUIContext.setQueryParams,
      newRestaurantInvoiceCostButtonClick: restaurantInvoiceCostsUIContext.newRestaurantInvoiceCostButtonClick,
      openDeleteRestaurantInvoiceCostsDialog: restaurantInvoiceCostsUIContext.openDeleteRestaurantInvoiceCostsDialog,
      openEditRestaurantInvoiceCostPage: restaurantInvoiceCostsUIContext.openEditRestaurantInvoiceCostPage,
      openUpdateRestaurantInvoiceCostsStatusDialog: restaurantInvoiceCostsUIContext.openUpdateRestaurantInvoiceCostsStatusDialog,
      openFetchRestaurantInvoiceCostsDialog: restaurantInvoiceCostsUIContext.openFetchRestaurantInvoiceCostsDialog,
    };
  }, [restaurantInvoiceCostsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RestaurantInvoiceCost.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantInvoiceCostsUIProps.newRestaurantInvoiceCostButtonClick}
          >
            {t("RestaurantInvoiceCost.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantInvoiceCostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantInvoiceCostsUIConsumer>
        <RestaurantInvoiceCostsTable />
      </CardBody>
    </Card>
  );
}