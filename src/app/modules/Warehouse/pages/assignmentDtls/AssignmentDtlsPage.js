import React from "react";
import { Route } from "react-router-dom";
import { AssignmentDtlsLoadingDialog } from "./assignmentDtls-loading-dialog/AssignmentDtlsLoadingDialog";
import { AssignmentDtlDeleteDialog } from "./assignmentDtl-delete-dialog/AssignmentDtlDeleteDialog";
import { AssignmentDtlsCard } from "./AssignmentDtlsCard";
import { AssignmentDtlsUIProvider } from "./AssignmentDtlsUIContext";

export function AssignmentDtlsPage({ history }) {
  const assignmentDtlsUIEvents = {
    newAssignmentDtlButtonClick: () => {
      history.push("/warehouse/assignmentDtls/new");
    },
    openEditAssignmentDtlPage: (id) => {
      history.push(`/warehouse/assignmentDtls/${id}/edit`);
    },
    openDeleteAssignmentDtlDialog: (id) => {
      history.push(`/warehouse/assignmentDtls/${id}/delete`);
    },
    openDeleteAssignmentDtlsDialog: () => {
      history.push(`/warehouse/assignmentDtls/deleteAssignmentDtls`);
    },
    openFetchAssignmentDtlsDialog: () => {
      history.push(`/warehouse/assignmentDtls/fetch`);
    },
    openUpdateAssignmentDtlsStatusDialog: () => {
      history.push("/warehouse/assignmentDtls/updateStatus");
    },
  };
  
  return (
    <AssignmentDtlsUIProvider assignmentDtlsUIEvents={assignmentDtlsUIEvents}>
      <AssignmentDtlsLoadingDialog />
      <Route path="/warehouse/assignmentDtls/:id/delete">
        {({ history, match }) => (
          <AssignmentDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/assignmentDtls");
            }}
          />
        )}
      </Route>
      <AssignmentDtlsCard />
    </AssignmentDtlsUIProvider>
  );
}