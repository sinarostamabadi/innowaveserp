
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { JobsTable } from "./jobs-table/JobsTable";
import { useJobsUIContext, JobsUIConsumer } from "./JobsUIContext";
import { useTranslation } from 'react-i18next';

export function JobsCard() {
  const { t } = useTranslation();

  const jobsUIContext = useJobsUIContext();

  const jobsUIProps = useMemo(() => {
    return {
      ids: jobsUIContext.ids,
      queryParams: jobsUIContext.queryParams,
      setQueryParams: jobsUIContext.setQueryParams,
      newJobButtonClick: jobsUIContext.newJobButtonClick,
      openDeleteJobsDialog: jobsUIContext.openDeleteJobsDialog,
      openEditJobPage: jobsUIContext.openEditJobPage,
      openUpdateJobsStatusDialog: jobsUIContext.openUpdateJobsStatusDialog,
      openFetchJobsDialog: jobsUIContext.openFetchJobsDialog,
    };
  }, [jobsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Job.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={jobsUIProps.newJobButtonClick}
          >
            {t("Job.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <JobsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </JobsUIConsumer>
        <JobsTable />
      </CardBody>
    </Card>
  );
}