import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MonthlyEmployeeIOsTable } from "./monthlyEmployeeIOs-table/MonthlyEmployeeIOsTable";
import {
  useMonthlyEmployeeIOsUIContext,
  MonthlyEmployeeIOsUIConsumer,
} from "./MonthlyEmployeeIOsUIContext";
import { useTranslation } from "react-i18next";

export function MonthlyEmployeeIOsCard() {
  const { t } = useTranslation();

  const monthlyEmployeeIOsUIContext = useMonthlyEmployeeIOsUIContext();

  const monthlyEmployeeIOsUIProps = useMemo(() => {
    return {
      ids: monthlyEmployeeIOsUIContext.ids,
      queryParams: monthlyEmployeeIOsUIContext.queryParams,
      setQueryParams: monthlyEmployeeIOsUIContext.setQueryParams,
      newMonthlyEmployeeIOButtonClick:
        monthlyEmployeeIOsUIContext.newMonthlyEmployeeIOButtonClick,
      openDeleteMonthlyEmployeeIOsDialog:
        monthlyEmployeeIOsUIContext.openDeleteMonthlyEmployeeIOsDialog,
      openEditMonthlyEmployeeIOPage:
        monthlyEmployeeIOsUIContext.openEditMonthlyEmployeeIOPage,
      openUpdateMonthlyEmployeeIOsStatusDialog:
        monthlyEmployeeIOsUIContext.openUpdateMonthlyEmployeeIOsStatusDialog,
      openFetchMonthlyEmployeeIOsDialog:
        monthlyEmployeeIOsUIContext.openFetchMonthlyEmployeeIOsDialog,
    };
  }, [monthlyEmployeeIOsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("MonthlyEmployeeIO.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={monthlyEmployeeIOsUIProps.newMonthlyEmployeeIOButtonClick}
          >
            {t("MonthlyEmployeeIO.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MonthlyEmployeeIOsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MonthlyEmployeeIOsUIConsumer>
        <MonthlyEmployeeIOsTable />
      </CardBody>
    </Card>
  );
}
