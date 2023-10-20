
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeInvoiceDiscountsTable } from "./coffeeInvoiceDiscounts-table/CoffeeInvoiceDiscountsTable";
import { useCoffeeInvoiceDiscountsUIContext, CoffeeInvoiceDiscountsUIConsumer } from "./CoffeeInvoiceDiscountsUIContext";
import { useTranslation } from 'react-i18next';

export function CoffeeInvoiceDiscountsCard() {
  const { t } = useTranslation();

  const coffeeInvoiceDiscountsUIContext = useCoffeeInvoiceDiscountsUIContext();

  const coffeeInvoiceDiscountsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceDiscountsUIContext.ids,
      queryParams: coffeeInvoiceDiscountsUIContext.queryParams,
      setQueryParams: coffeeInvoiceDiscountsUIContext.setQueryParams,
      newCoffeeInvoiceDiscountButtonClick: coffeeInvoiceDiscountsUIContext.newCoffeeInvoiceDiscountButtonClick,
      openDeleteCoffeeInvoiceDiscountsDialog: coffeeInvoiceDiscountsUIContext.openDeleteCoffeeInvoiceDiscountsDialog,
      openEditCoffeeInvoiceDiscountPage: coffeeInvoiceDiscountsUIContext.openEditCoffeeInvoiceDiscountPage,
      openUpdateCoffeeInvoiceDiscountsStatusDialog: coffeeInvoiceDiscountsUIContext.openUpdateCoffeeInvoiceDiscountsStatusDialog,
      openFetchCoffeeInvoiceDiscountsDialog: coffeeInvoiceDiscountsUIContext.openFetchCoffeeInvoiceDiscountsDialog,
    };
  }, [coffeeInvoiceDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CoffeeInvoiceDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeInvoiceDiscountsUIProps.newCoffeeInvoiceDiscountButtonClick}
          >
            {t("CoffeeInvoiceDiscount.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeInvoiceDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeInvoiceDiscountsUIConsumer>
        <CoffeeInvoiceDiscountsTable />
      </CardBody>
    </Card>
  );
}