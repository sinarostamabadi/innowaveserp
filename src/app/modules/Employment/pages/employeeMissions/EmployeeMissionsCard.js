
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeMissionsTable } from "./employeeMissions-table/EmployeeMissionsTable";
import { useEmployeeMissionsUIContext, EmployeeMissionsUIConsumer } from "./EmployeeMissionsUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeeMissionsCard() {
  const { t } = useTranslation();

  const employeeMissionsUIContext = useEmployeeMissionsUIContext();

  const employeeMissionsUIProps = useMemo(() => {
    return {
      ids: employeeMissionsUIContext.ids,
      queryParams: employeeMissionsUIContext.queryParams,
      setQueryParams: employeeMissionsUIContext.setQueryParams,
      newEmployeeMissionButtonClick: employeeMissionsUIContext.newEmployeeMissionButtonClick,
      openDeleteEmployeeMissionsDialog: employeeMissionsUIContext.openDeleteEmployeeMissionsDialog,
      openEditEmployeeMissionPage: employeeMissionsUIContext.openEditEmployeeMissionPage,
      openUpdateEmployeeMissionsStatusDialog: employeeMissionsUIContext.openUpdateEmployeeMissionsStatusDialog,
      openFetchEmployeeMissionsDialog: employeeMissionsUIContext.openFetchEmployeeMissionsDialog,
    };
  }, [employeeMissionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EmployeeMission.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeMissionsUIProps.newEmployeeMissionButtonClick}
          >
            {t("EmployeeMission.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeMissionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeMissionsUIConsumer>
        <EmployeeMissionsTable />
      </CardBody>
    </Card>
  );
}