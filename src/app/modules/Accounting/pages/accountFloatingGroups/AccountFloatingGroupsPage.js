import React from "react";
import { Route } from "react-router-dom";
import { AccountFloatingGroupsLoadingDialog } from "./accountFloatingGroups-loading-dialog/AccountFloatingGroupsLoadingDialog";
import { AccountFloatingGroupDeleteDialog } from "./accountFloatingGroup-delete-dialog/AccountFloatingGroupDeleteDialog";
import { AccountFloatingGroupsCard } from "./AccountFloatingGroupsCard";
import { AccountFloatingGroupsUIProvider } from "./AccountFloatingGroupsUIContext";

export function AccountFloatingGroupsPage({ history }) {
  const accountFloatingGroupsUIEvents = {
    newAccountFloatingGroupButtonClick: () => {
      history.push("/accounting/accountFloatingGroups/new");
    },
    openEditAccountFloatingGroupPage: (id) => {
      history.push(`/accounting/accountFloatingGroups/${id}/edit`);
    },
    openDeleteAccountFloatingGroupDialog: (id) => {
      history.push(`/accounting/accountFloatingGroups/${id}/delete`);
    },
    openDeleteAccountFloatingGroupsDialog: () => {
      history.push(
        `/accounting/accountFloatingGroups/deleteAccountFloatingGroups`
      );
    },
    openFetchAccountFloatingGroupsDialog: () => {
      history.push(`/accounting/accountFloatingGroups/fetch`);
    },
    openUpdateAccountFloatingGroupsStatusDialog: () => {
      history.push("/accounting/accountFloatingGroups/updateStatus");
    },
  };

  return (
    <AccountFloatingGroupsUIProvider
      accountFloatingGroupsUIEvents={accountFloatingGroupsUIEvents}
    >
      <AccountFloatingGroupsLoadingDialog />
      <Route path="/accounting/accountFloatingGroups/:id/delete">
        {({ history, match }) => (
          <AccountFloatingGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountFloatingGroups");
            }}
          />
        )}
      </Route>
      <AccountFloatingGroupsCard />
    </AccountFloatingGroupsUIProvider>
  );
}
