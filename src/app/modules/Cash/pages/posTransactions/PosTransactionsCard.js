
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { PosTransactionsTable } from "./posTransactions-table/PosTransactionsTable";
import { usePosTransactionsUIContext, PosTransactionsUIConsumer } from "./PosTransactionsUIContext";
import { useTranslation } from 'react-i18next';

export function PosTransactionsCard() {
  const { t } = useTranslation();

  const posTransactionsUIContext = usePosTransactionsUIContext();

  const posTransactionsUIProps = useMemo(() => {
    return {
      ids: posTransactionsUIContext.ids,
      queryParams: posTransactionsUIContext.queryParams,
      setQueryParams: posTransactionsUIContext.setQueryParams,
      newPosTransactionButtonClick: posTransactionsUIContext.newPosTransactionButtonClick,
      openDeletePosTransactionsDialog: posTransactionsUIContext.openDeletePosTransactionsDialog,
      openEditPosTransactionPage: posTransactionsUIContext.openEditPosTransactionPage,
      openUpdatePosTransactionsStatusDialog: posTransactionsUIContext.openUpdatePosTransactionsStatusDialog,
      openFetchPosTransactionsDialog: posTransactionsUIContext.openFetchPosTransactionsDialog,
    };
  }, [posTransactionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("PosTransaction.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={posTransactionsUIProps.newPosTransactionButtonClick}
          >
            {t("PosTransaction.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PosTransactionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PosTransactionsUIConsumer>
        <PosTransactionsTable />
      </CardBody>
    </Card>
  );
}