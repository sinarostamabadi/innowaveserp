import React from "react";
import { Route } from "react-router-dom";
import { AccountFloatingGroupRelationsLoadingDialog } from "./accountFloatingGroupRelations-loading-dialog/AccountFloatingGroupRelationsLoadingDialog";
import { AccountFloatingGroupRelationDeleteDialog } from "./accountFloatingGroupRelation-delete-dialog/AccountFloatingGroupRelationDeleteDialog";
import { AccountFloatingGroupRelationsCard } from "./AccountFloatingGroupRelationsCard";
import { AccountFloatingGroupRelationsUIProvider } from "./AccountFloatingGroupRelationsUIContext";

export function AccountFloatingGroupRelationsPage({ history }) {
  const accountFloatingGroupRelationsUIEvents = {
    newAccountFloatingGroupRelationButtonClick: () => {
      history.push("/accounting/accountFloatingGroupRelations/new");
    },
    openEditAccountFloatingGroupRelationPage: (id) => {
      history.push(`/accounting/accountFloatingGroupRelations/${id}/edit`);
    },
    openDeleteAccountFloatingGroupRelationDialog: (id) => {
      history.push(`/accounting/accountFloatingGroupRelations/${id}/delete`);
    },
    openDeleteAccountFloatingGroupRelationsDialog: () => {
      history.push(
        `/accounting/accountFloatingGroupRelations/deleteAccountFloatingGroupRelations`
      );
    },
    openFetchAccountFloatingGroupRelationsDialog: () => {
      history.push(`/accounting/accountFloatingGroupRelations/fetch`);
    },
    openUpdateAccountFloatingGroupRelationsStatusDialog: () => {
      history.push("/accounting/accountFloatingGroupRelations/updateStatus");
    },
  };

  return (
    <AccountFloatingGroupRelationsUIProvider
      accountFloatingGroupRelationsUIEvents={
        accountFloatingGroupRelationsUIEvents
      }
    >
      <AccountFloatingGroupRelationsLoadingDialog />
      <Route path="/accounting/accountFloatingGroupRelations/:id/delete">
        {({ history, match }) => (
          <AccountFloatingGroupRelationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/accountFloatingGroupRelations");
            }}
          />
        )}
      </Route>
      <AccountFloatingGroupRelationsCard />
    </AccountFloatingGroupRelationsUIProvider>
  );
}
