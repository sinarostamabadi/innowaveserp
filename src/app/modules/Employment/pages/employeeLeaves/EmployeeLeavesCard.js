import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeLeavesTable } from "./employeeLeaves-table/EmployeeLeavesTable";
import {
  useEmployeeLeavesUIContext,
  EmployeeLeavesUIConsumer,
} from "./EmployeeLeavesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeLeavesCard() {
  const { t } = useTranslation();

  const employeeLeavesUIContext = useEmployeeLeavesUIContext();

  const employeeLeavesUIProps = useMemo(() => {
    return {
      ids: employeeLeavesUIContext.ids,
      queryParams: employeeLeavesUIContext.queryParams,
      setQueryParams: employeeLeavesUIContext.setQueryParams,
      newEmployeeLeaveButtonClick:
        employeeLeavesUIContext.newEmployeeLeaveButtonClick,
      openDeleteEmployeeLeavesDialog:
        employeeLeavesUIContext.openDeleteEmployeeLeavesDialog,
      openEditEmployeeLeavePage:
        employeeLeavesUIContext.openEditEmployeeLeavePage,
      openUpdateEmployeeLeavesStatusDialog:
        employeeLeavesUIContext.openUpdateEmployeeLeavesStatusDialog,
      openFetchEmployeeLeavesDialog:
        employeeLeavesUIContext.openFetchEmployeeLeavesDialog,
    };
  }, [employeeLeavesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmployeeLeave.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeLeavesUIProps.newEmployeeLeaveButtonClick}
          >
            {t("EmployeeLeave.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeLeavesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeLeavesUIConsumer>
        <EmployeeLeavesTable />
      </CardBody>
    </Card>
  );
}
