import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeLeaveChangesTable } from "./employeeLeaveChanges-table/EmployeeLeaveChangesTable";
import {
  useEmployeeLeaveChangesUIContext,
  EmployeeLeaveChangesUIConsumer,
} from "./EmployeeLeaveChangesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeLeaveChangesCard() {
  const { t } = useTranslation();

  const employeeLeaveChangesUIContext = useEmployeeLeaveChangesUIContext();

  const employeeLeaveChangesUIProps = useMemo(() => {
    return {
      ids: employeeLeaveChangesUIContext.ids,
      queryParams: employeeLeaveChangesUIContext.queryParams,
      setQueryParams: employeeLeaveChangesUIContext.setQueryParams,
      newEmployeeLeaveChangeButtonClick:
        employeeLeaveChangesUIContext.newEmployeeLeaveChangeButtonClick,
      openDeleteEmployeeLeaveChangesDialog:
        employeeLeaveChangesUIContext.openDeleteEmployeeLeaveChangesDialog,
      openEditEmployeeLeaveChangePage:
        employeeLeaveChangesUIContext.openEditEmployeeLeaveChangePage,
      openUpdateEmployeeLeaveChangesStatusDialog:
        employeeLeaveChangesUIContext.openUpdateEmployeeLeaveChangesStatusDialog,
      openFetchEmployeeLeaveChangesDialog:
        employeeLeaveChangesUIContext.openFetchEmployeeLeaveChangesDialog,
    };
  }, [employeeLeaveChangesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeLeaveChange.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeeLeaveChangesUIProps.newEmployeeLeaveChangeButtonClick
            }
          >
            {t("EmployeeLeaveChange.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeLeaveChangesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeLeaveChangesUIConsumer>
        <EmployeeLeaveChangesTable />
      </CardBody>
    </Card>
  );
}
