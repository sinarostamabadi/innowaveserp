
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeePhysicalConditionsTable } from "./employeePhysicalConditions-table/EmployeePhysicalConditionsTable";
import { useEmployeePhysicalConditionsUIContext, EmployeePhysicalConditionsUIConsumer } from "./EmployeePhysicalConditionsUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeePhysicalConditionsCard() {
  const { t } = useTranslation();

  const employeePhysicalConditionsUIContext = useEmployeePhysicalConditionsUIContext();

  const employeePhysicalConditionsUIProps = useMemo(() => {
    return {
      ids: employeePhysicalConditionsUIContext.ids,
      queryParams: employeePhysicalConditionsUIContext.queryParams,
      setQueryParams: employeePhysicalConditionsUIContext.setQueryParams,
      newEmployeePhysicalConditionButtonClick: employeePhysicalConditionsUIContext.newEmployeePhysicalConditionButtonClick,
      openDeleteEmployeePhysicalConditionsDialog: employeePhysicalConditionsUIContext.openDeleteEmployeePhysicalConditionsDialog,
      openEditEmployeePhysicalConditionPage: employeePhysicalConditionsUIContext.openEditEmployeePhysicalConditionPage,
      openUpdateEmployeePhysicalConditionsStatusDialog: employeePhysicalConditionsUIContext.openUpdateEmployeePhysicalConditionsStatusDialog,
      openFetchEmployeePhysicalConditionsDialog: employeePhysicalConditionsUIContext.openFetchEmployeePhysicalConditionsDialog,
    };
  }, [employeePhysicalConditionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EmployeePhysicalCondition.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeePhysicalConditionsUIProps.newEmployeePhysicalConditionButtonClick}
          >
            {t("EmployeePhysicalCondition.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeePhysicalConditionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeePhysicalConditionsUIConsumer>
        <EmployeePhysicalConditionsTable />
      </CardBody>
    </Card>
  );
}