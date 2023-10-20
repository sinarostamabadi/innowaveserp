import React from "react";
import { Route } from "react-router-dom";
import { AccountFloatingLoadingDialog } from "./accountFloating-loading-dialog/AccountFloatingLoadingDialog";
import { AccountFloatingDeleteDialog } from "./accountFloating-delete-dialog/AccountFloatingDeleteDialog";
import { AccountFloatingCard } from "./AccountFloatingCard";
import { AccountFloatingUIProvider } from "./AccountFloatingUIContext";

export function AccountFloatingPage({ history }) {
  const accountFloatingUIEvents = {
    newAccountFloatingButtonClick: () => {
      history.push("/accounting/accountFloatings/new");
    },
    openEditAccountFloatingPage: (id) => {
      history.push(`/accounting/accountFloatings/${id}/edit`);
    },
    openDeleteAccountFloatingDialog: (id) => {
      history.push(`/accounting/accountFloatings/${id}/delete`);
    },
    openDeleteAccountFloatingsDialog: () => {
      history.push(`/accounting/accountFloatings/deleteAccountFloating`);
    },
    openFetchAccountFloatingDialog: () => {
      history.push(`/accounting/accountFloatings/fetch`);
    },
    openUpdateAccountFloatingStatusDialog: () => {
      history.push("/accounting/accountFloatings/updateStatus");
    },
  };
  
  return (
    <AccountFloatingUIProvider accountFloatingUIEvents={accountFloatingUIEvents}>
      <AccountFloatingLoadingDialog />
      <Route path="/accounting/accountFloatings/:id/delete">
        {({ history, match }) => (
          <AccountFloatingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountFloatings");
            }}
          />
        )}
      </Route>
      <AccountFloatingCard />
    </AccountFloatingUIProvider>
  );
}