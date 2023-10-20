
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeInvoiceDtlsTable } from "./coffeeInvoiceDtls-table/CoffeeInvoiceDtlsTable";
import { useCoffeeInvoiceDtlsUIContext, CoffeeInvoiceDtlsUIConsumer } from "./CoffeeInvoiceDtlsUIContext";
import { useTranslation } from 'react-i18next';

export function CoffeeInvoiceDtlsCard() {
  const { t } = useTranslation();

  const coffeeInvoiceDtlsUIContext = useCoffeeInvoiceDtlsUIContext();

  const coffeeInvoiceDtlsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceDtlsUIContext.ids,
      queryParams: coffeeInvoiceDtlsUIContext.queryParams,
      setQueryParams: coffeeInvoiceDtlsUIContext.setQueryParams,
      newCoffeeInvoiceDtlButtonClick: coffeeInvoiceDtlsUIContext.newCoffeeInvoiceDtlButtonClick,
      openDeleteCoffeeInvoiceDtlsDialog: coffeeInvoiceDtlsUIContext.openDeleteCoffeeInvoiceDtlsDialog,
      openEditCoffeeInvoiceDtlPage: coffeeInvoiceDtlsUIContext.openEditCoffeeInvoiceDtlPage,
      openUpdateCoffeeInvoiceDtlsStatusDialog: coffeeInvoiceDtlsUIContext.openUpdateCoffeeInvoiceDtlsStatusDialog,
      openFetchCoffeeInvoiceDtlsDialog: coffeeInvoiceDtlsUIContext.openFetchCoffeeInvoiceDtlsDialog,
    };
  }, [coffeeInvoiceDtlsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CoffeeInvoiceDtl.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeInvoiceDtlsUIProps.newCoffeeInvoiceDtlButtonClick}
          >
            {t("CoffeeInvoiceDtl.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeInvoiceDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeInvoiceDtlsUIConsumer>
        <CoffeeInvoiceDtlsTable />
      </CardBody>
    </Card>
  );
}