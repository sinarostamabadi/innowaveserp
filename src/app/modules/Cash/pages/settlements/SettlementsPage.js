import React from "react";
import { Route } from "react-router-dom";
import { SettlementsLoadingDialog } from "./settlements-loading-dialog/SettlementsLoadingDialog";
import { SettlementDeleteDialog } from "./settlement-delete-dialog/SettlementDeleteDialog";
import { SettlementsCard } from "./SettlementsCard";
import { SettlementsUIProvider } from "./SettlementsUIContext";

export function SettlementsPage({ history }) {
  const settlementsUIEvents = {
    newSettlementButtonClick: () => {
      history.push("/cash/settlements/new");
    },
    openEditSettlementPage: (id) => {
      history.push(`/cash/settlements/${id}/edit`);
    },
    openDeleteSettlementDialog: (id) => {
      history.push(`/cash/settlements/${id}/delete`);
    },
    openDeleteSettlementsDialog: () => {
      history.push(`/cash/settlements/deleteSettlements`);
    },
    openFetchSettlementsDialog: () => {
      history.push(`/cash/settlements/fetch`);
    },
    openUpdateSettlementsStatusDialog: () => {
      history.push("/cash/settlements/updateStatus");
    },
  };
  
  return (
    <SettlementsUIProvider settlementsUIEvents={settlementsUIEvents}>
      <SettlementsLoadingDialog />
      <Route path="/cash/settlements/:id/delete">
        {({ history, match }) => (
          <SettlementDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/settlements");
            }}
          />
        )}
      </Route>
      <SettlementsCard />
    </SettlementsUIProvider>
  );
}