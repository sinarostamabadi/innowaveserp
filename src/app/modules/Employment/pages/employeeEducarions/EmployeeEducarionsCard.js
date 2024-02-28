import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeEducarionsTable } from "./employeeEducarions-table/EmployeeEducarionsTable";
import {
  useEmployeeEducarionsUIContext,
  EmployeeEducarionsUIConsumer,
} from "./EmployeeEducarionsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeEducarionsCard() {
  const { t } = useTranslation();

  const employeeEducarionsUIContext = useEmployeeEducarionsUIContext();

  const employeeEducarionsUIProps = useMemo(() => {
    return {
      ids: employeeEducarionsUIContext.ids,
      queryParams: employeeEducarionsUIContext.queryParams,
      setQueryParams: employeeEducarionsUIContext.setQueryParams,
      newEmployeeEducarionButtonClick:
        employeeEducarionsUIContext.newEmployeeEducarionButtonClick,
      openDeleteEmployeeEducarionsDialog:
        employeeEducarionsUIContext.openDeleteEmployeeEducarionsDialog,
      openEditEmployeeEducarionPage:
        employeeEducarionsUIContext.openEditEmployeeEducarionPage,
      openUpdateEmployeeEducarionsStatusDialog:
        employeeEducarionsUIContext.openUpdateEmployeeEducarionsStatusDialog,
      openFetchEmployeeEducarionsDialog:
        employeeEducarionsUIContext.openFetchEmployeeEducarionsDialog,
    };
  }, [employeeEducarionsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeEducarion.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeEducarionsUIProps.newEmployeeEducarionButtonClick}
          >
            {t("EmployeeEducarion.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeEducarionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeEducarionsUIConsumer>
        <EmployeeEducarionsTable />
      </CardBody>
    </Card>
  );
}
