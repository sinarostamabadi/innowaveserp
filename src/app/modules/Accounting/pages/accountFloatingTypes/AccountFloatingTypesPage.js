import React from "react";
import { Route } from "react-router-dom";
import { AccountFloatingTypesLoadingDialog } from "./accountFloatingTypes-loading-dialog/AccountFloatingTypesLoadingDialog";
import { AccountFloatingTypeDeleteDialog } from "./accountFloatingType-delete-dialog/AccountFloatingTypeDeleteDialog";
import { AccountFloatingTypesCard } from "./AccountFloatingTypesCard";
import { AccountFloatingTypesUIProvider } from "./AccountFloatingTypesUIContext";

export function AccountFloatingTypesPage({ history }) {
  const accountFloatingTypesUIEvents = {
    newAccountFloatingTypeButtonClick: () => {
      history.push("/accounting/accountFloatingTypes/new");
    },
    openEditAccountFloatingTypePage: (id) => {
      history.push(`/accounting/accountFloatingTypes/${id}/edit`);
    },
    openDeleteAccountFloatingTypeDialog: (id) => {
      history.push(`/accounting/accountFloatingTypes/${id}/delete`);
    },
    openDeleteAccountFloatingTypesDialog: () => {
      history.push(
        `/accounting/accountFloatingTypes/deleteAccountFloatingTypes`
      );
    },
    openFetchAccountFloatingTypesDialog: () => {
      history.push(`/accounting/accountFloatingTypes/fetch`);
    },
    openUpdateAccountFloatingTypesStatusDialog: () => {
      history.push("/accounting/accountFloatingTypes/updateStatus");
    },
  };

  return (
    <AccountFloatingTypesUIProvider
      accountFloatingTypesUIEvents={accountFloatingTypesUIEvents}
    >
      <AccountFloatingTypesLoadingDialog />
      <Route path="/accounting/accountFloatingTypes/:id/delete">
        {({ history, match }) => (
          <AccountFloatingTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountFloatingTypes");
            }}
          />
        )}
      </Route>
      <AccountFloatingTypesCard />
    </AccountFloatingTypesUIProvider>
  );
}
