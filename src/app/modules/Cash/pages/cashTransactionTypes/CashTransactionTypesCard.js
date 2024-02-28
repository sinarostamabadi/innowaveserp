import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CashTransactionTypesTable } from "./cashTransactionTypes-table/CashTransactionTypesTable";
import {
  useCashTransactionTypesUIContext,
  CashTransactionTypesUIConsumer,
} from "./CashTransactionTypesUIContext";
import { useTranslation } from "react-i18next";

export function CashTransactionTypesCard() {
  const { t } = useTranslation();

  const cashTransactionTypesUIContext = useCashTransactionTypesUIContext();

  const cashTransactionTypesUIProps = useMemo(() => {
    return {
      ids: cashTransactionTypesUIContext.ids,
      queryParams: cashTransactionTypesUIContext.queryParams,
      setQueryParams: cashTransactionTypesUIContext.setQueryParams,
      newCashTransactionTypeButtonClick:
        cashTransactionTypesUIContext.newCashTransactionTypeButtonClick,
      openDeleteCashTransactionTypesDialog:
        cashTransactionTypesUIContext.openDeleteCashTransactionTypesDialog,
      openEditCashTransactionTypePage:
        cashTransactionTypesUIContext.openEditCashTransactionTypePage,
      openUpdateCashTransactionTypesStatusDialog:
        cashTransactionTypesUIContext.openUpdateCashTransactionTypesStatusDialog,
      openFetchCashTransactionTypesDialog:
        cashTransactionTypesUIContext.openFetchCashTransactionTypesDialog,
    };
  }, [cashTransactionTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("CashTransactionType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              cashTransactionTypesUIProps.newCashTransactionTypeButtonClick
            }
          >
            {t("CashTransactionType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CashTransactionTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CashTransactionTypesUIConsumer>
        <CashTransactionTypesTable />
      </CardBody>
    </Card>
  );
}
