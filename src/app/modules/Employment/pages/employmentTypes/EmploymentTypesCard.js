import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmploymentTypesTable } from "./employmentTypes-table/EmploymentTypesTable";
import {
  useEmploymentTypesUIContext,
  EmploymentTypesUIConsumer,
} from "./EmploymentTypesUIContext";
import { useTranslation } from "react-i18next";

export function EmploymentTypesCard() {
  const { t } = useTranslation();

  const employmentTypesUIContext = useEmploymentTypesUIContext();

  const employmentTypesUIProps = useMemo(() => {
    return {
      ids: employmentTypesUIContext.ids,
      queryParams: employmentTypesUIContext.queryParams,
      setQueryParams: employmentTypesUIContext.setQueryParams,
      newEmploymentTypeButtonClick:
        employmentTypesUIContext.newEmploymentTypeButtonClick,
      openDeleteEmploymentTypesDialog:
        employmentTypesUIContext.openDeleteEmploymentTypesDialog,
      openEditEmploymentTypePage:
        employmentTypesUIContext.openEditEmploymentTypePage,
      openUpdateEmploymentTypesStatusDialog:
        employmentTypesUIContext.openUpdateEmploymentTypesStatusDialog,
      openFetchEmploymentTypesDialog:
        employmentTypesUIContext.openFetchEmploymentTypesDialog,
    };
  }, [employmentTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmploymentType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employmentTypesUIProps.newEmploymentTypeButtonClick}
          >
            {t("EmploymentType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmploymentTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmploymentTypesUIConsumer>
        <EmploymentTypesTable />
      </CardBody>
    </Card>
  );
}
