import React from "react";
import { Route } from "react-router-dom";
import { ActionsLoadingDialog } from "./actions-loading-dialog/ActionsLoadingDialog";
import { ActionDeleteDialog } from "./action-delete-dialog/ActionDeleteDialog";
import { ActionsCard } from "./ActionsCard";
import { ActionsUIProvider } from "./ActionsUIContext";

export function ActionsPage({ history }) {
  const actionsUIEvents = {
    newActionButtonClick: () => {
      history.push("/security/actions/new");
    },
    openEditActionPage: (id) => {
      history.push(`/security/actions/${id}/edit`);
    },
    openDeleteActionDialog: (id) => {
      history.push(`/security/actions/${id}/delete`);
    },
    openDeleteActionsDialog: () => {
      history.push(`/security/actions/deleteActions`);
    },
    openFetchActionsDialog: () => {
      history.push(`/security/actions/fetch`);
    },
    openUpdateActionsStatusDialog: () => {
      history.push("/security/actions/updateStatus");
    },
  };

  return (
    <ActionsUIProvider actionsUIEvents={actionsUIEvents}>
      <ActionsLoadingDialog />
      <Route path="/security/actions/:id/delete">
        {({ history, match }) => (
          <ActionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/actions");
            }}
          />
        )}
      </Route>
      <ActionsCard />
    </ActionsUIProvider>
  );
}
