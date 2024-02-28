import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmploymentStatusesTable } from "./employmentStatuses-table/EmploymentStatusesTable";
import {
  useEmploymentStatusesUIContext,
  EmploymentStatusesUIConsumer,
} from "./EmploymentStatusesUIContext";
import { useTranslation } from "react-i18next";

export function EmploymentStatusesCard() {
  const { t } = useTranslation();

  const employmentStatusesUIContext = useEmploymentStatusesUIContext();

  const employmentStatusesUIProps = useMemo(() => {
    return {
      ids: employmentStatusesUIContext.ids,
      queryParams: employmentStatusesUIContext.queryParams,
      setQueryParams: employmentStatusesUIContext.setQueryParams,
      newEmploymentStatusButtonClick:
        employmentStatusesUIContext.newEmploymentStatusButtonClick,
      openDeleteEmploymentStatusesDialog:
        employmentStatusesUIContext.openDeleteEmploymentStatusesDialog,
      openEditEmploymentStatusPage:
        employmentStatusesUIContext.openEditEmploymentStatusPage,
      openUpdateEmploymentStatusesStatusDialog:
        employmentStatusesUIContext.openUpdateEmploymentStatusesStatusDialog,
      openFetchEmploymentStatusesDialog:
        employmentStatusesUIContext.openFetchEmploymentStatusesDialog,
    };
  }, [employmentStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmploymentStatus.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employmentStatusesUIProps.newEmploymentStatusButtonClick}
          >
            {t("EmploymentStatus.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmploymentStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmploymentStatusesUIConsumer>
        <EmploymentStatusesTable />
      </CardBody>
    </Card>
  );
}
