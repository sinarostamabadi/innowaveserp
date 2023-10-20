
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeWorkShiftsTable } from "./employeeWorkShifts-table/EmployeeWorkShiftsTable";
import { useEmployeeWorkShiftsUIContext, EmployeeWorkShiftsUIConsumer } from "./EmployeeWorkShiftsUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeeWorkShiftsCard() {
  const { t } = useTranslation();

  const employeeWorkShiftsUIContext = useEmployeeWorkShiftsUIContext();

  const employeeWorkShiftsUIProps = useMemo(() => {
    return {
      ids: employeeWorkShiftsUIContext.ids,
      queryParams: employeeWorkShiftsUIContext.queryParams,
      setQueryParams: employeeWorkShiftsUIContext.setQueryParams,
      newEmployeeWorkShiftButtonClick: employeeWorkShiftsUIContext.newEmployeeWorkShiftButtonClick,
      openDeleteEmployeeWorkShiftsDialog: employeeWorkShiftsUIContext.openDeleteEmployeeWorkShiftsDialog,
      openEditEmployeeWorkShiftPage: employeeWorkShiftsUIContext.openEditEmployeeWorkShiftPage,
      openUpdateEmployeeWorkShiftsStatusDialog: employeeWorkShiftsUIContext.openUpdateEmployeeWorkShiftsStatusDialog,
      openFetchEmployeeWorkShiftsDialog: employeeWorkShiftsUIContext.openFetchEmployeeWorkShiftsDialog,
    };
  }, [employeeWorkShiftsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EmployeeWorkShift.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeWorkShiftsUIProps.newEmployeeWorkShiftButtonClick}
          >
            {t("EmployeeWorkShift.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeWorkShiftsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeWorkShiftsUIConsumer>
        <EmployeeWorkShiftsTable />
      </CardBody>
    </Card>
  );
}