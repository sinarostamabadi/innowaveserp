import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { WorkShiftCalendersTable } from "./workShiftCalenders-table/WorkShiftCalendersTable";
import {
  useWorkShiftCalendersUIContext,
  WorkShiftCalendersUIConsumer,
} from "./WorkShiftCalendersUIContext";
import { useTranslation } from "react-i18next";

export function WorkShiftCalendersCard() {
  const { t } = useTranslation();

  const workShiftCalendersUIContext = useWorkShiftCalendersUIContext();

  const workShiftCalendersUIProps = useMemo(() => {
    return {
      ids: workShiftCalendersUIContext.ids,
      queryParams: workShiftCalendersUIContext.queryParams,
      setQueryParams: workShiftCalendersUIContext.setQueryParams,
      newWorkShiftCalenderButtonClick:
        workShiftCalendersUIContext.newWorkShiftCalenderButtonClick,
      openDeleteWorkShiftCalendersDialog:
        workShiftCalendersUIContext.openDeleteWorkShiftCalendersDialog,
      openEditWorkShiftCalenderPage:
        workShiftCalendersUIContext.openEditWorkShiftCalenderPage,
      openUpdateWorkShiftCalendersStatusDialog:
        workShiftCalendersUIContext.openUpdateWorkShiftCalendersStatusDialog,
      openFetchWorkShiftCalendersDialog:
        workShiftCalendersUIContext.openFetchWorkShiftCalendersDialog,
    };
  }, [workShiftCalendersUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("WorkShiftCalender.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={workShiftCalendersUIProps.newWorkShiftCalenderButtonClick}
          >
            {t("WorkShiftCalender.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <WorkShiftCalendersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </WorkShiftCalendersUIConsumer>
        <WorkShiftCalendersTable />
      </CardBody>
    </Card>
  );
}
