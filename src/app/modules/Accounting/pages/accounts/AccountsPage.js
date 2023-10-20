import React from "react";
import { Route } from "react-router-dom";
import { AccountsLoadingDialog } from "./accounts-loading-dialog/AccountsLoadingDialog";
import { AccountDeleteDialog } from "./account-delete-dialog/AccountDeleteDialog";
import { AccountsCard } from "./AccountsCard";
import { AccountsUIProvider } from "./AccountsUIContext";
import { DetailEditDialog } from "./Account-edit-dialog/DetailEditDialog";

export function AccountsPage({ history }) {
  const accountsUIEvents = {
    newAccountButtonClick: () => {
      history.push("/accounting/accounts/new");
    },
    openEditAccountPage: (id) => {
      history.push(`/accounting/accounts/${id}/edit`);
    },
    openDeleteAccountDialog: (id) => {
      history.push(`/accounting/accounts/${id}/delete`);
    },
    openDeleteAccountsDialog: () => {
      history.push(`/accounting/accounts/deleteAccounts`);
    },
  };
  
  return (
    <AccountsUIProvider accountsUIEvents={accountsUIEvents}>
      <AccountsLoadingDialog />
      <Route path="/accounting/accounts/:id/delete">
        {({ history, match }) => (
          <AccountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accounts");
            }}
          />
        )}
      </Route>
      <DetailEditDialog />
      <AccountsCard />
    </AccountsUIProvider>
  );
}