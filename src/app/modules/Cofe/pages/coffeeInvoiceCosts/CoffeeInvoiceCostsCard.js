
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeInvoiceCostsTable } from "./coffeeInvoiceCosts-table/CoffeeInvoiceCostsTable";
import { useCoffeeInvoiceCostsUIContext, CoffeeInvoiceCostsUIConsumer } from "./CoffeeInvoiceCostsUIContext";
import { useTranslation } from 'react-i18next';

export function CoffeeInvoiceCostsCard() {
  const { t } = useTranslation();

  const coffeeInvoiceCostsUIContext = useCoffeeInvoiceCostsUIContext();

  const coffeeInvoiceCostsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceCostsUIContext.ids,
      queryParams: coffeeInvoiceCostsUIContext.queryParams,
      setQueryParams: coffeeInvoiceCostsUIContext.setQueryParams,
      newCoffeeInvoiceCostButtonClick: coffeeInvoiceCostsUIContext.newCoffeeInvoiceCostButtonClick,
      openDeleteCoffeeInvoiceCostsDialog: coffeeInvoiceCostsUIContext.openDeleteCoffeeInvoiceCostsDialog,
      openEditCoffeeInvoiceCostPage: coffeeInvoiceCostsUIContext.openEditCoffeeInvoiceCostPage,
      openUpdateCoffeeInvoiceCostsStatusDialog: coffeeInvoiceCostsUIContext.openUpdateCoffeeInvoiceCostsStatusDialog,
      openFetchCoffeeInvoiceCostsDialog: coffeeInvoiceCostsUIContext.openFetchCoffeeInvoiceCostsDialog,
    };
  }, [coffeeInvoiceCostsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CoffeeInvoiceCost.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeInvoiceCostsUIProps.newCoffeeInvoiceCostButtonClick}
          >
            {t("CoffeeInvoiceCost.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeInvoiceCostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeInvoiceCostsUIConsumer>
        <CoffeeInvoiceCostsTable />
      </CardBody>
    </Card>
  );
}