import React from "react";
import { Route } from "react-router-dom";
import { AccountTypesLoadingDialog } from "./accountTypes-loading-dialog/AccountTypesLoadingDialog";
import { AccountTypeDeleteDialog } from "./accountType-delete-dialog/AccountTypeDeleteDialog";
import { AccountTypesCard } from "./AccountTypesCard";
import { AccountTypesUIProvider } from "./AccountTypesUIContext";

export function AccountTypesPage({ history }) {
  const accountTypesUIEvents = {
    newAccountTypeButtonClick: () => {
      history.push("/accounting/accountTypes/new");
    },
    openEditAccountTypePage: (id) => {
      history.push(`/accounting/accountTypes/${id}/edit`);
    },
    openDeleteAccountTypeDialog: (id) => {
      history.push(`/accounting/accountTypes/${id}/delete`);
    },
    openDeleteAccountTypesDialog: () => {
      history.push(`/accounting/accountTypes/deleteAccountTypes`);
    },
    openFetchAccountTypesDialog: () => {
      history.push(`/accounting/accountTypes/fetch`);
    },
    openUpdateAccountTypesStatusDialog: () => {
      history.push("/accounting/accountTypes/updateStatus");
    },
  };

  return (
    <AccountTypesUIProvider accountTypesUIEvents={accountTypesUIEvents}>
      <AccountTypesLoadingDialog />
      <Route path="/accounting/accountTypes/:id/delete">
        {({ history, match }) => (
          <AccountTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountTypes");
            }}
          />
        )}
      </Route>
      <AccountTypesCard />
    </AccountTypesUIProvider>
  );
}
