import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CashsTable } from "./cashs-table/CashsTable";
import { useCashsUIContext, CashsUIConsumer } from "./CashsUIContext";
import { useTranslation } from 'react-i18next';

export function CashsCard() {
  const { t } = useTranslation();

  const cashsUIContext = useCashsUIContext();

  const cashsUIProps = useMemo(() => {
    return {
      ids: cashsUIContext.ids,
      queryParams: cashsUIContext.queryParams,
      setQueryParams: cashsUIContext.setQueryParams,
      newCashButtonClick: cashsUIContext.newCashButtonClick,
      openDeleteCashsDialog: cashsUIContext.openDeleteCashsDialog,
      openEditCashPage: cashsUIContext.openEditCashPage,
      openUpdateCashsStatusDialog: cashsUIContext.openUpdateCashsStatusDialog,
      openFetchCashsDialog: cashsUIContext.openFetchCashsDialog,
    };
  }, [cashsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Cash.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={cashsUIProps.newCashButtonClick}
          >
            {t("Cash.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CashsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CashsUIConsumer>
        <CashsTable />
      </CardBody>
    </Card>
  );
}
