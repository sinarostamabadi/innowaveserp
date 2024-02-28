import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeChildsTable } from "./employeeChilds-table/EmployeeChildsTable";
import {
  useEmployeeChildsUIContext,
  EmployeeChildsUIConsumer,
} from "./EmployeeChildsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeChildsCard() {
  const { t } = useTranslation();

  const employeeChildsUIContext = useEmployeeChildsUIContext();

  const employeeChildsUIProps = useMemo(() => {
    return {
      ids: employeeChildsUIContext.ids,
      queryParams: employeeChildsUIContext.queryParams,
      setQueryParams: employeeChildsUIContext.setQueryParams,
      newEmployeeChildButtonClick:
        employeeChildsUIContext.newEmployeeChildButtonClick,
      openDeleteEmployeeChildsDialog:
        employeeChildsUIContext.openDeleteEmployeeChildsDialog,
      openEditEmployeeChildPage:
        employeeChildsUIContext.openEditEmployeeChildPage,
      openUpdateEmployeeChildsStatusDialog:
        employeeChildsUIContext.openUpdateEmployeeChildsStatusDialog,
      openFetchEmployeeChildsDialog:
        employeeChildsUIContext.openFetchEmployeeChildsDialog,
    };
  }, [employeeChildsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmployeeChild.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeChildsUIProps.newEmployeeChildButtonClick}
          >
            {t("EmployeeChild.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeChildsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeChildsUIConsumer>
        <EmployeeChildsTable />
      </CardBody>
    </Card>
  );
}
