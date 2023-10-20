
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantInvoiceDiscountsTable } from "./restaurantInvoiceDiscounts-table/RestaurantInvoiceDiscountsTable";
import { useRestaurantInvoiceDiscountsUIContext, RestaurantInvoiceDiscountsUIConsumer } from "./RestaurantInvoiceDiscountsUIContext";
import { useTranslation } from 'react-i18next';

export function RestaurantInvoiceDiscountsCard() {
  const { t } = useTranslation();

  const restaurantInvoiceDiscountsUIContext = useRestaurantInvoiceDiscountsUIContext();

  const restaurantInvoiceDiscountsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceDiscountsUIContext.ids,
      queryParams: restaurantInvoiceDiscountsUIContext.queryParams,
      setQueryParams: restaurantInvoiceDiscountsUIContext.setQueryParams,
      newRestaurantInvoiceDiscountButtonClick: restaurantInvoiceDiscountsUIContext.newRestaurantInvoiceDiscountButtonClick,
      openDeleteRestaurantInvoiceDiscountsDialog: restaurantInvoiceDiscountsUIContext.openDeleteRestaurantInvoiceDiscountsDialog,
      openEditRestaurantInvoiceDiscountPage: restaurantInvoiceDiscountsUIContext.openEditRestaurantInvoiceDiscountPage,
      openUpdateRestaurantInvoiceDiscountsStatusDialog: restaurantInvoiceDiscountsUIContext.openUpdateRestaurantInvoiceDiscountsStatusDialog,
      openFetchRestaurantInvoiceDiscountsDialog: restaurantInvoiceDiscountsUIContext.openFetchRestaurantInvoiceDiscountsDialog,
    };
  }, [restaurantInvoiceDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RestaurantInvoiceDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantInvoiceDiscountsUIProps.newRestaurantInvoiceDiscountButtonClick}
          >
            {t("RestaurantInvoiceDiscount.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantInvoiceDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantInvoiceDiscountsUIConsumer>
        <RestaurantInvoiceDiscountsTable />
      </CardBody>
    </Card>
  );
}