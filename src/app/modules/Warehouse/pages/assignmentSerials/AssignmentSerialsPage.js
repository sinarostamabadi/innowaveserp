import React from "react";
import { Route } from "react-router-dom";
import { AssignmentSerialsLoadingDialog } from "./assignmentSerials-loading-dialog/AssignmentSerialsLoadingDialog";
import { AssignmentSerialDeleteDialog } from "./assignmentSerial-delete-dialog/AssignmentSerialDeleteDialog";
import { AssignmentSerialsCard } from "./AssignmentSerialsCard";
import { AssignmentSerialsUIProvider } from "./AssignmentSerialsUIContext";

export function AssignmentSerialsPage({ history }) {
  const assignmentSerialsUIEvents = {
    newAssignmentSerialButtonClick: () => {
      history.push("/warehouse/assignmentSerials/new");
    },
    openEditAssignmentSerialPage: (id) => {
      history.push(`/warehouse/assignmentSerials/${id}/edit`);
    },
    openDeleteAssignmentSerialDialog: (id) => {
      history.push(`/warehouse/assignmentSerials/${id}/delete`);
    },
    openDeleteAssignmentSerialsDialog: () => {
      history.push(`/warehouse/assignmentSerials/deleteAssignmentSerials`);
    },
    openFetchAssignmentSerialsDialog: () => {
      history.push(`/warehouse/assignmentSerials/fetch`);
    },
    openUpdateAssignmentSerialsStatusDialog: () => {
      history.push("/warehouse/assignmentSerials/updateStatus");
    },
  };
  
  return (
    <AssignmentSerialsUIProvider assignmentSerialsUIEvents={assignmentSerialsUIEvents}>
      <AssignmentSerialsLoadingDialog />
      <Route path="/warehouse/assignmentSerials/:id/delete">
        {({ history, match }) => (
          <AssignmentSerialDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/assignmentSerials");
            }}
          />
        )}
      </Route>
      <AssignmentSerialsCard />
    </AssignmentSerialsUIProvider>
  );
}