import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeSpecialDatesTable } from "./employeeSpecialDates-table/EmployeeSpecialDatesTable";
import {
  useEmployeeSpecialDatesUIContext,
  EmployeeSpecialDatesUIConsumer,
} from "./EmployeeSpecialDatesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeSpecialDatesCard() {
  const { t } = useTranslation();

  const employeeSpecialDatesUIContext = useEmployeeSpecialDatesUIContext();

  const employeeSpecialDatesUIProps = useMemo(() => {
    return {
      ids: employeeSpecialDatesUIContext.ids,
      queryParams: employeeSpecialDatesUIContext.queryParams,
      setQueryParams: employeeSpecialDatesUIContext.setQueryParams,
      newEmployeeSpecialDateButtonClick:
        employeeSpecialDatesUIContext.newEmployeeSpecialDateButtonClick,
      openDeleteEmployeeSpecialDatesDialog:
        employeeSpecialDatesUIContext.openDeleteEmployeeSpecialDatesDialog,
      openEditEmployeeSpecialDatePage:
        employeeSpecialDatesUIContext.openEditEmployeeSpecialDatePage,
      openUpdateEmployeeSpecialDatesStatusDialog:
        employeeSpecialDatesUIContext.openUpdateEmployeeSpecialDatesStatusDialog,
      openFetchEmployeeSpecialDatesDialog:
        employeeSpecialDatesUIContext.openFetchEmployeeSpecialDatesDialog,
    };
  }, [employeeSpecialDatesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeSpecialDate.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeeSpecialDatesUIProps.newEmployeeSpecialDateButtonClick
            }
          >
            {t("EmployeeSpecialDate.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeSpecialDatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeSpecialDatesUIConsumer>
        <EmployeeSpecialDatesTable />
      </CardBody>
    </Card>
  );
}
