
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeesTable } from "./employees-table/EmployeesTable";
import { useEmployeesUIContext, EmployeesUIConsumer } from "./EmployeesUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeesCard() {
  const { t } = useTranslation();

  const employeesUIContext = useEmployeesUIContext();

  const employeesUIProps = useMemo(() => {
    return {
      ids: employeesUIContext.ids,
      queryParams: employeesUIContext.queryParams,
      setQueryParams: employeesUIContext.setQueryParams,
      newEmployeeButtonClick: employeesUIContext.newEmployeeButtonClick,
      openDeleteEmployeesDialog: employeesUIContext.openDeleteEmployeesDialog,
      openEditEmployeePage: employeesUIContext.openEditEmployeePage,
      openUpdateEmployeesStatusDialog: employeesUIContext.openUpdateEmployeesStatusDialog,
      openFetchEmployeesDialog: employeesUIContext.openFetchEmployeesDialog,
    };
  }, [employeesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Employee.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeesUIProps.newEmployeeButtonClick}
          >
            {t("Employee.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeesUIConsumer>
        <EmployeesTable />
      </CardBody>
    </Card>
  );
}