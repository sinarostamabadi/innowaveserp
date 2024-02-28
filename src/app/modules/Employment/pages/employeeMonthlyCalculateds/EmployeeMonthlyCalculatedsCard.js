import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeMonthlyCalculatedsTable } from "./employeeMonthlyCalculateds-table/EmployeeMonthlyCalculatedsTable";
import {
  useEmployeeMonthlyCalculatedsUIContext,
  EmployeeMonthlyCalculatedsUIConsumer,
} from "./EmployeeMonthlyCalculatedsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeMonthlyCalculatedsCard() {
  const { t } = useTranslation();

  const employeeMonthlyCalculatedsUIContext =
    useEmployeeMonthlyCalculatedsUIContext();

  const employeeMonthlyCalculatedsUIProps = useMemo(() => {
    return {
      ids: employeeMonthlyCalculatedsUIContext.ids,
      queryParams: employeeMonthlyCalculatedsUIContext.queryParams,
      setQueryParams: employeeMonthlyCalculatedsUIContext.setQueryParams,
      newEmployeeMonthlyCalculatedButtonClick:
        employeeMonthlyCalculatedsUIContext.newEmployeeMonthlyCalculatedButtonClick,
      openDeleteEmployeeMonthlyCalculatedsDialog:
        employeeMonthlyCalculatedsUIContext.openDeleteEmployeeMonthlyCalculatedsDialog,
      openEditEmployeeMonthlyCalculatedPage:
        employeeMonthlyCalculatedsUIContext.openEditEmployeeMonthlyCalculatedPage,
      openUpdateEmployeeMonthlyCalculatedsStatusDialog:
        employeeMonthlyCalculatedsUIContext.openUpdateEmployeeMonthlyCalculatedsStatusDialog,
      openFetchEmployeeMonthlyCalculatedsDialog:
        employeeMonthlyCalculatedsUIContext.openFetchEmployeeMonthlyCalculatedsDialog,
    };
  }, [employeeMonthlyCalculatedsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeMonthlyCalculated.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeeMonthlyCalculatedsUIProps.newEmployeeMonthlyCalculatedButtonClick
            }
          >
            {t("EmployeeMonthlyCalculated.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeMonthlyCalculatedsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeMonthlyCalculatedsUIConsumer>
        <EmployeeMonthlyCalculatedsTable />
      </CardBody>
    </Card>
  );
}
