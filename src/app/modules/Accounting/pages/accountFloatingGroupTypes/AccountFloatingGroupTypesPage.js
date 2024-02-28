import React from "react";
import { Route } from "react-router-dom";
import { AccountFloatingGroupTypesLoadingDialog } from "./accountFloatingGroupTypes-loading-dialog/AccountFloatingGroupTypesLoadingDialog";
import { AccountFloatingGroupTypeDeleteDialog } from "./accountFloatingGroupType-delete-dialog/AccountFloatingGroupTypeDeleteDialog";
import { AccountFloatingGroupTypesCard } from "./AccountFloatingGroupTypesCard";
import { AccountFloatingGroupTypesUIProvider } from "./AccountFloatingGroupTypesUIContext";

export function AccountFloatingGroupTypesPage({ history }) {
  const accountFloatingGroupTypesUIEvents = {
    newAccountFloatingGroupTypeButtonClick: () => {
      history.push("/accounting/accountFloatingGroupTypes/new");
    },
    openEditAccountFloatingGroupTypePage: (id) => {
      history.push(`/accounting/accountFloatingGroupTypes/${id}/edit`);
    },
    openDeleteAccountFloatingGroupTypeDialog: (id) => {
      history.push(`/accounting/accountFloatingGroupTypes/${id}/delete`);
    },
    openDeleteAccountFloatingGroupTypesDialog: () => {
      history.push(
        `/accounting/accountFloatingGroupTypes/deleteAccountFloatingGroupTypes`
      );
    },
    openFetchAccountFloatingGroupTypesDialog: () => {
      history.push(`/accounting/accountFloatingGroupTypes/fetch`);
    },
    openUpdateAccountFloatingGroupTypesStatusDialog: () => {
      history.push("/accounting/accountFloatingGroupTypes/updateStatus");
    },
  };

  return (
    <AccountFloatingGroupTypesUIProvider
      accountFloatingGroupTypesUIEvents={accountFloatingGroupTypesUIEvents}
    >
      <AccountFloatingGroupTypesLoadingDialog />
      <Route path="/accounting/accountFloatingGroupTypes/:id/delete">
        {({ history, match }) => (
          <AccountFloatingGroupTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountFloatingGroupTypes");
            }}
          />
        )}
      </Route>
      <AccountFloatingGroupTypesCard />
    </AccountFloatingGroupTypesUIProvider>
  );
}
