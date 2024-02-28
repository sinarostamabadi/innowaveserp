import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { WorkShiftsTable } from "./workShifts-table/WorkShiftsTable";
import {
  useWorkShiftsUIContext,
  WorkShiftsUIConsumer,
} from "./WorkShiftsUIContext";
import { useTranslation } from "react-i18next";

export function WorkShiftsCard() {
  const { t } = useTranslation();

  const workShiftsUIContext = useWorkShiftsUIContext();

  const workShiftsUIProps = useMemo(() => {
    return {
      ids: workShiftsUIContext.ids,
      queryParams: workShiftsUIContext.queryParams,
      setQueryParams: workShiftsUIContext.setQueryParams,
      newWorkShiftButtonClick: workShiftsUIContext.newWorkShiftButtonClick,
      openDeleteWorkShiftsDialog:
        workShiftsUIContext.openDeleteWorkShiftsDialog,
      openEditWorkShiftPage: workShiftsUIContext.openEditWorkShiftPage,
      openUpdateWorkShiftsStatusDialog:
        workShiftsUIContext.openUpdateWorkShiftsStatusDialog,
      openFetchWorkShiftsDialog: workShiftsUIContext.openFetchWorkShiftsDialog,
    };
  }, [workShiftsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("WorkShift.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={workShiftsUIProps.newWorkShiftButtonClick}
          >
            {t("WorkShift.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <WorkShiftsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </WorkShiftsUIConsumer>
        <WorkShiftsTable />
      </CardBody>
    </Card>
  );
}
