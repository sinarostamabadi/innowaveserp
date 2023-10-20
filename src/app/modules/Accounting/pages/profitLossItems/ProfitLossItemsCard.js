
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProfitLossItemsTable } from "./profitLossItems-table/ProfitLossItemsTable";
import { useProfitLossItemsUIContext, ProfitLossItemsUIConsumer } from "./ProfitLossItemsUIContext";
import { useTranslation } from 'react-i18next';

export function ProfitLossItemsCard() {
  const { t } = useTranslation();

  const profitLossItemsUIContext = useProfitLossItemsUIContext();

  const profitLossItemsUIProps = useMemo(() => {
    return {
      ids: profitLossItemsUIContext.ids,
      queryParams: profitLossItemsUIContext.queryParams,
      setQueryParams: profitLossItemsUIContext.setQueryParams,
      newProfitLossItemButtonClick: profitLossItemsUIContext.newProfitLossItemButtonClick,
      openDeleteProfitLossItemsDialog: profitLossItemsUIContext.openDeleteProfitLossItemsDialog,
      openEditProfitLossItemPage: profitLossItemsUIContext.openEditProfitLossItemPage,
      openUpdateProfitLossItemsStatusDialog: profitLossItemsUIContext.openUpdateProfitLossItemsStatusDialog,
      openFetchProfitLossItemsDialog: profitLossItemsUIContext.openFetchProfitLossItemsDialog,
    };
  }, [profitLossItemsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ProfitLossItem.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={profitLossItemsUIProps.newProfitLossItemButtonClick}
          >
            {t("ProfitLossItem.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProfitLossItemsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProfitLossItemsUIConsumer>
        <ProfitLossItemsTable />
      </CardBody>
    </Card>
  );
}