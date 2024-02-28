import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InsuranceJobsTable } from "./insuranceJobs-table/InsuranceJobsTable";
import {
  useInsuranceJobsUIContext,
  InsuranceJobsUIConsumer,
} from "./InsuranceJobsUIContext";
import { useTranslation } from "react-i18next";

export function InsuranceJobsCard() {
  const { t } = useTranslation();

  const insuranceJobsUIContext = useInsuranceJobsUIContext();

  const insuranceJobsUIProps = useMemo(() => {
    return {
      ids: insuranceJobsUIContext.ids,
      queryParams: insuranceJobsUIContext.queryParams,
      setQueryParams: insuranceJobsUIContext.setQueryParams,
      newInsuranceJobButtonClick:
        insuranceJobsUIContext.newInsuranceJobButtonClick,
      openDeleteInsuranceJobsDialog:
        insuranceJobsUIContext.openDeleteInsuranceJobsDialog,
      openEditInsuranceJobPage: insuranceJobsUIContext.openEditInsuranceJobPage,
      openUpdateInsuranceJobsStatusDialog:
        insuranceJobsUIContext.openUpdateInsuranceJobsStatusDialog,
      openFetchInsuranceJobsDialog:
        insuranceJobsUIContext.openFetchInsuranceJobsDialog,
    };
  }, [insuranceJobsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("InsuranceJob.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={insuranceJobsUIProps.newInsuranceJobButtonClick}
          >
            {t("InsuranceJob.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InsuranceJobsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InsuranceJobsUIConsumer>
        <InsuranceJobsTable />
      </CardBody>
    </Card>
  );
}
