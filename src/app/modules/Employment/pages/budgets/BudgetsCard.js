import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BudgetsTable } from "./budgets-table/BudgetsTable";
import { useBudgetsUIContext, BudgetsUIConsumer } from "./BudgetsUIContext";
import { useTranslation } from "react-i18next";

export function BudgetsCard() {
  const { t } = useTranslation();

  const budgetsUIContext = useBudgetsUIContext();

  const budgetsUIProps = useMemo(() => {
    return {
      ids: budgetsUIContext.ids,
      queryParams: budgetsUIContext.queryParams,
      setQueryParams: budgetsUIContext.setQueryParams,
      newBudgetButtonClick: budgetsUIContext.newBudgetButtonClick,
      openDeleteBudgetsDialog: budgetsUIContext.openDeleteBudgetsDialog,
      openEditBudgetPage: budgetsUIContext.openEditBudgetPage,
      openUpdateBudgetsStatusDialog:
        budgetsUIContext.openUpdateBudgetsStatusDialog,
      openFetchBudgetsDialog: budgetsUIContext.openFetchBudgetsDialog,
    };
  }, [budgetsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Budget.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={budgetsUIProps.newBudgetButtonClick}
          >
            {t("Budget.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BudgetsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BudgetsUIConsumer>
        <BudgetsTable />
      </CardBody>
    </Card>
  );
}
