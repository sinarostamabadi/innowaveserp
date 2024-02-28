import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantInvoiceDtlsTable } from "./restaurantInvoiceDtls-table/RestaurantInvoiceDtlsTable";
import {
  useRestaurantInvoiceDtlsUIContext,
  RestaurantInvoiceDtlsUIConsumer,
} from "./RestaurantInvoiceDtlsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceDtlsCard() {
  const { t } = useTranslation();

  const restaurantInvoiceDtlsUIContext = useRestaurantInvoiceDtlsUIContext();

  const restaurantInvoiceDtlsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceDtlsUIContext.ids,
      queryParams: restaurantInvoiceDtlsUIContext.queryParams,
      setQueryParams: restaurantInvoiceDtlsUIContext.setQueryParams,
      newRestaurantInvoiceDtlButtonClick:
        restaurantInvoiceDtlsUIContext.newRestaurantInvoiceDtlButtonClick,
      openDeleteRestaurantInvoiceDtlsDialog:
        restaurantInvoiceDtlsUIContext.openDeleteRestaurantInvoiceDtlsDialog,
      openEditRestaurantInvoiceDtlPage:
        restaurantInvoiceDtlsUIContext.openEditRestaurantInvoiceDtlPage,
      openUpdateRestaurantInvoiceDtlsStatusDialog:
        restaurantInvoiceDtlsUIContext.openUpdateRestaurantInvoiceDtlsStatusDialog,
      openFetchRestaurantInvoiceDtlsDialog:
        restaurantInvoiceDtlsUIContext.openFetchRestaurantInvoiceDtlsDialog,
    };
  }, [restaurantInvoiceDtlsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantInvoiceDtl.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantInvoiceDtlsUIProps.newRestaurantInvoiceDtlButtonClick
            }
          >
            {t("RestaurantInvoiceDtl.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantInvoiceDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantInvoiceDtlsUIConsumer>
        <RestaurantInvoiceDtlsTable />
      </CardBody>
    </Card>
  );
}
