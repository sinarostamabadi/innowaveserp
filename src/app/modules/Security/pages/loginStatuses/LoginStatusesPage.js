import React from "react";
import { Route } from "react-router-dom";
import { LoginStatusesLoadingDialog } from "./loginStatuses-loading-dialog/LoginStatusesLoadingDialog";
import { LoginStatusDeleteDialog } from "./loginStatus-delete-dialog/LoginStatusDeleteDialog";
import { LoginStatusesCard } from "./LoginStatusesCard";
import { LoginStatusesUIProvider } from "./LoginStatusesUIContext";

export function LoginStatusesPage({ history }) {
  const loginStatusesUIEvents = {
    newLoginStatusButtonClick: () => {
      history.push("/security/loginStatuses/new");
    },
    openEditLoginStatusPage: (id) => {
      history.push(`/security/loginStatuses/${id}/edit`);
    },
    openDeleteLoginStatusDialog: (id) => {
      history.push(`/security/loginStatuses/${id}/delete`);
    },
    openDeleteLoginStatusesDialog: () => {
      history.push(`/security/loginStatuses/deleteLoginStatuses`);
    },
    openFetchLoginStatusesDialog: () => {
      history.push(`/security/loginStatuses/fetch`);
    },
    openUpdateLoginStatusesStatusDialog: () => {
      history.push("/security/loginStatuses/updateStatus");
    },
  };
  
  return (
    <LoginStatusesUIProvider loginStatusesUIEvents={loginStatusesUIEvents}>
      <LoginStatusesLoadingDialog />
      <Route path="/security/loginStatuses/:id/delete">
        {({ history, match }) => (
          <LoginStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/loginStatuses");
            }}
          />
        )}
      </Route>
      <LoginStatusesCard />
    </LoginStatusesUIProvider>
  );
}