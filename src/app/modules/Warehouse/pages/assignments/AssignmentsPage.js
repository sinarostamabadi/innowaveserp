import React from "react";
import { Route } from "react-router-dom";
import { AssignmentsLoadingDialog } from "./assignments-loading-dialog/AssignmentsLoadingDialog";
import { AssignmentDeleteDialog } from "./assignment-delete-dialog/AssignmentDeleteDialog";
import { AssignmentsCard } from "./AssignmentsCard";
import { AssignmentsUIProvider } from "./AssignmentsUIContext";

export function AssignmentsPage({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const assignmentsUIEvents = {
    newAssignmentButtonClick: () => {
      history.push(
        !!mode ? `/warehouse/assignments/new/${mode}` : "/warehouse/assignments/new"
        );
    },
    openEditAssignmentPage: (id) => {
      history.push(`/warehouse/assignments/${id}/edit`);
    },
    openDeleteAssignmentDialog: (id) => {
      history.push(`/warehouse/assignments/${id}/delete`);
    },
    openDeleteAssignmentsDialog: () => {
      history.push(`/warehouse/assignments/deleteAssignments`);
    },
    openFetchAssignmentsDialog: () => {
      history.push(`/warehouse/assignments/fetch`);
    },
    openUpdateAssignmentsStatusDialog: () => {
      history.push("/warehouse/assignments/updateStatus");
    },
  };
  
  return (
    <AssignmentsUIProvider assignmentsUIEvents={assignmentsUIEvents} mode={mode}>
      <AssignmentsLoadingDialog />
      <Route path="/warehouse/assignments/:id/delete">
        {({ history, match }) => (
          <AssignmentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(!!mode ? `/warehouse/assignments/${mode}` : "/warehouse/assignments"
              );
            }}
          />
        )}
      </Route>
      <AssignmentsCard />
    </AssignmentsUIProvider>
  );
}