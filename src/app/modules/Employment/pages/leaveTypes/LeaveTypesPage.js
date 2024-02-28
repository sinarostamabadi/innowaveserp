import React from "react";
import { Route } from "react-router-dom";
import { LeaveTypesLoadingDialog } from "./leaveTypes-loading-dialog/LeaveTypesLoadingDialog";
import { LeaveTypeDeleteDialog } from "./leaveType-delete-dialog/LeaveTypeDeleteDialog";
import { LeaveTypesCard } from "./LeaveTypesCard";
import { LeaveTypesUIProvider } from "./LeaveTypesUIContext";

export function LeaveTypesPage({ history }) {
  const leaveTypesUIEvents = {
    newLeaveTypeButtonClick: () => {
      history.push("/employment/leaveTypes/new");
    },
    openEditLeaveTypePage: (id) => {
      history.push(`/employment/leaveTypes/${id}/edit`);
    },
    openDeleteLeaveTypeDialog: (id) => {
      history.push(`/employment/leaveTypes/${id}/delete`);
    },
    openDeleteLeaveTypesDialog: () => {
      history.push(`/employment/leaveTypes/deleteLeaveTypes`);
    },
    openFetchLeaveTypesDialog: () => {
      history.push(`/employment/leaveTypes/fetch`);
    },
    openUpdateLeaveTypesStatusDialog: () => {
      history.push("/employment/leaveTypes/updateStatus");
    },
  };

  return (
    <LeaveTypesUIProvider leaveTypesUIEvents={leaveTypesUIEvents}>
      <LeaveTypesLoadingDialog />
      <Route path="/employment/leaveTypes/:id/delete">
        {({ history, match }) => (
          <LeaveTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/leaveTypes");
            }}
          />
        )}
      </Route>
      <LeaveTypesCard />
    </LeaveTypesUIProvider>
  );
}
