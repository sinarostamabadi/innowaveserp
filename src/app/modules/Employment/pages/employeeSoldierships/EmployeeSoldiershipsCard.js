import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeSoldiershipsTable } from "./employeeSoldierships-table/EmployeeSoldiershipsTable";
import {
  useEmployeeSoldiershipsUIContext,
  EmployeeSoldiershipsUIConsumer,
} from "./EmployeeSoldiershipsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeSoldiershipsCard() {
  const { t } = useTranslation();

  const employeeSoldiershipsUIContext = useEmployeeSoldiershipsUIContext();

  const employeeSoldiershipsUIProps = useMemo(() => {
    return {
      ids: employeeSoldiershipsUIContext.ids,
      queryParams: employeeSoldiershipsUIContext.queryParams,
      setQueryParams: employeeSoldiershipsUIContext.setQueryParams,
      newEmployeeSoldiershipButtonClick:
        employeeSoldiershipsUIContext.newEmployeeSoldiershipButtonClick,
      openDeleteEmployeeSoldiershipsDialog:
        employeeSoldiershipsUIContext.openDeleteEmployeeSoldiershipsDialog,
      openEditEmployeeSoldiershipPage:
        employeeSoldiershipsUIContext.openEditEmployeeSoldiershipPage,
      openUpdateEmployeeSoldiershipsStatusDialog:
        employeeSoldiershipsUIContext.openUpdateEmployeeSoldiershipsStatusDialog,
      openFetchEmployeeSoldiershipsDialog:
        employeeSoldiershipsUIContext.openFetchEmployeeSoldiershipsDialog,
    };
  }, [employeeSoldiershipsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeSoldiership.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeeSoldiershipsUIProps.newEmployeeSoldiershipButtonClick
            }
          >
            {t("EmployeeSoldiership.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeSoldiershipsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeSoldiershipsUIConsumer>
        <EmployeeSoldiershipsTable />
      </CardBody>
    </Card>
  );
}
