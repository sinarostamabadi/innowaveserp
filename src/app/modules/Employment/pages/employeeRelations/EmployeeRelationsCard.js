import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeRelationsTable } from "./employeeRelations-table/EmployeeRelationsTable";
import {
  useEmployeeRelationsUIContext,
  EmployeeRelationsUIConsumer,
} from "./EmployeeRelationsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeRelationsCard() {
  const { t } = useTranslation();

  const employeeRelationsUIContext = useEmployeeRelationsUIContext();

  const employeeRelationsUIProps = useMemo(() => {
    return {
      ids: employeeRelationsUIContext.ids,
      queryParams: employeeRelationsUIContext.queryParams,
      setQueryParams: employeeRelationsUIContext.setQueryParams,
      newEmployeeRelationButtonClick:
        employeeRelationsUIContext.newEmployeeRelationButtonClick,
      openDeleteEmployeeRelationsDialog:
        employeeRelationsUIContext.openDeleteEmployeeRelationsDialog,
      openEditEmployeeRelationPage:
        employeeRelationsUIContext.openEditEmployeeRelationPage,
      openUpdateEmployeeRelationsStatusDialog:
        employeeRelationsUIContext.openUpdateEmployeeRelationsStatusDialog,
      openFetchEmployeeRelationsDialog:
        employeeRelationsUIContext.openFetchEmployeeRelationsDialog,
    };
  }, [employeeRelationsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmployeeRelation.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeRelationsUIProps.newEmployeeRelationButtonClick}
          >
            {t("EmployeeRelation.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeRelationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeRelationsUIConsumer>
        <EmployeeRelationsTable />
      </CardBody>
    </Card>
  );
}
