import React from "react";
import { Route } from "react-router-dom";
import { LoginHistoriesLoadingDialog } from "./loginHistories-loading-dialog/LoginHistoriesLoadingDialog";
import { LoginHistoryDeleteDialog } from "./loginHistory-delete-dialog/LoginHistoryDeleteDialog";
import { LoginHistoriesCard } from "./LoginHistoriesCard";
import { LoginHistoriesUIProvider } from "./LoginHistoriesUIContext";

export function LoginHistoriesPage({ history }) {
  const loginHistoriesUIEvents = {
    newLoginHistoryButtonClick: () => {
      history.push("/security/loginHistories/new");
    },
    openEditLoginHistoryPage: (id) => {
      history.push(`/security/loginHistories/${id}/edit`);
    },
    openDeleteLoginHistoryDialog: (id) => {
      history.push(`/security/loginHistories/${id}/delete`);
    },
    openDeleteLoginHistoriesDialog: () => {
      history.push(`/security/loginHistories/deleteLoginHistories`);
    },
    openFetchLoginHistoriesDialog: () => {
      history.push(`/security/loginHistories/fetch`);
    },
    openUpdateLoginHistoriesStatusDialog: () => {
      history.push("/security/loginHistories/updateStatus");
    },
  };

  return (
    <LoginHistoriesUIProvider loginHistoriesUIEvents={loginHistoriesUIEvents}>
      <LoginHistoriesLoadingDialog />
      <Route path="/security/loginHistories/:id/delete">
        {({ history, match }) => (
          <LoginHistoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/loginHistories");
            }}
          />
        )}
      </Route>
      <LoginHistoriesCard />
    </LoginHistoriesUIProvider>
  );
}
