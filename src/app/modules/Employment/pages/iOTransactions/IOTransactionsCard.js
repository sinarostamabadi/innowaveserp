
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { IOTransactionsTable } from "./iOTransactions-table/IOTransactionsTable";
import { useIOTransactionsUIContext, IOTransactionsUIConsumer } from "./IOTransactionsUIContext";
import { useTranslation } from 'react-i18next';

export function IOTransactionsCard() {
  const { t } = useTranslation();

  const iOTransactionsUIContext = useIOTransactionsUIContext();

  const iOTransactionsUIProps = useMemo(() => {
    return {
      ids: iOTransactionsUIContext.ids,
      queryParams: iOTransactionsUIContext.queryParams,
      setQueryParams: iOTransactionsUIContext.setQueryParams,
      newIOTransactionButtonClick: iOTransactionsUIContext.newIOTransactionButtonClick,
      openDeleteIOTransactionsDialog: iOTransactionsUIContext.openDeleteIOTransactionsDialog,
      openEditIOTransactionPage: iOTransactionsUIContext.openEditIOTransactionPage,
      openUpdateIOTransactionsStatusDialog: iOTransactionsUIContext.openUpdateIOTransactionsStatusDialog,
      openFetchIOTransactionsDialog: iOTransactionsUIContext.openFetchIOTransactionsDialog,
    };
  }, [iOTransactionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("IOTransaction.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iOTransactionsUIProps.newIOTransactionButtonClick}
          >
            {t("IOTransaction.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IOTransactionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </IOTransactionsUIConsumer>
        <IOTransactionsTable />
      </CardBody>
    </Card>
  );
}