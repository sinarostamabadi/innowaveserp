
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeInvoicesTable } from "./coffeeInvoices-table/CoffeeInvoicesTable";
import { useCoffeeInvoicesUIContext, CoffeeInvoicesUIConsumer } from "./CoffeeInvoicesUIContext";
import { useTranslation } from 'react-i18next';

export function CoffeeInvoicesCard() {
  const { t } = useTranslation();

  const coffeeInvoicesUIContext = useCoffeeInvoicesUIContext();

  const coffeeInvoicesUIProps = useMemo(() => {
    return {
      ids: coffeeInvoicesUIContext.ids,
      queryParams: coffeeInvoicesUIContext.queryParams,
      setQueryParams: coffeeInvoicesUIContext.setQueryParams,
      newCoffeeInvoiceButtonClick: coffeeInvoicesUIContext.newCoffeeInvoiceButtonClick,
      openDeleteCoffeeInvoicesDialog: coffeeInvoicesUIContext.openDeleteCoffeeInvoicesDialog,
      openEditCoffeeInvoicePage: coffeeInvoicesUIContext.openEditCoffeeInvoicePage,
      openUpdateCoffeeInvoicesStatusDialog: coffeeInvoicesUIContext.openUpdateCoffeeInvoicesStatusDialog,
      openFetchCoffeeInvoicesDialog: coffeeInvoicesUIContext.openFetchCoffeeInvoicesDialog,
    };
  }, [coffeeInvoicesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CoffeeInvoice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeInvoicesUIProps.newCoffeeInvoiceButtonClick}
          >
            {t("CoffeeInvoice.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeInvoicesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeInvoicesUIConsumer>
        <CoffeeInvoicesTable />
      </CardBody>
    </Card>
  );
}