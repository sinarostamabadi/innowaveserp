import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LeaveTypesTable } from "./leaveTypes-table/LeaveTypesTable";
import {
  useLeaveTypesUIContext,
  LeaveTypesUIConsumer,
} from "./LeaveTypesUIContext";
import { useTranslation } from "react-i18next";

export function LeaveTypesCard() {
  const { t } = useTranslation();

  const leaveTypesUIContext = useLeaveTypesUIContext();

  const leaveTypesUIProps = useMemo(() => {
    return {
      ids: leaveTypesUIContext.ids,
      queryParams: leaveTypesUIContext.queryParams,
      setQueryParams: leaveTypesUIContext.setQueryParams,
      newLeaveTypeButtonClick: leaveTypesUIContext.newLeaveTypeButtonClick,
      openDeleteLeaveTypesDialog:
        leaveTypesUIContext.openDeleteLeaveTypesDialog,
      openEditLeaveTypePage: leaveTypesUIContext.openEditLeaveTypePage,
      openUpdateLeaveTypesStatusDialog:
        leaveTypesUIContext.openUpdateLeaveTypesStatusDialog,
      openFetchLeaveTypesDialog: leaveTypesUIContext.openFetchLeaveTypesDialog,
    };
  }, [leaveTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("LeaveType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={leaveTypesUIProps.newLeaveTypeButtonClick}
          >
            {t("LeaveType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LeaveTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LeaveTypesUIConsumer>
        <LeaveTypesTable />
      </CardBody>
    </Card>
  );
}
