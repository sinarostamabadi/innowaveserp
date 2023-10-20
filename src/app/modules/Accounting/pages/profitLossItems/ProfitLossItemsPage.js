import React from "react";
import { Route } from "react-router-dom";
import { ProfitLossItemsLoadingDialog } from "./profitLossItems-loading-dialog/ProfitLossItemsLoadingDialog";
import { ProfitLossItemDeleteDialog } from "./profitLossItem-delete-dialog/ProfitLossItemDeleteDialog";
import { ProfitLossItemsCard } from "./ProfitLossItemsCard";
import { ProfitLossItemsUIProvider } from "./ProfitLossItemsUIContext";

export function ProfitLossItemsPage({ history }) {
  const profitLossItemsUIEvents = {
    newProfitLossItemButtonClick: () => {
      history.push("/accounting/profitLossItems/new");
    },
    openEditProfitLossItemPage: (id) => {
      history.push(`/accounting/profitLossItems/${id}/edit`);
    },
    openDeleteProfitLossItemDialog: (id) => {
      history.push(`/accounting/profitLossItems/${id}/delete`);
    },
    openDeleteProfitLossItemsDialog: () => {
      history.push(`/accounting/profitLossItems/deleteProfitLossItems`);
    },
    openFetchProfitLossItemsDialog: () => {
      history.push(`/accounting/profitLossItems/fetch`);
    },
    openUpdateProfitLossItemsStatusDialog: () => {
      history.push("/accounting/profitLossItems/updateStatus");
    },
  };
  
  return (
    <ProfitLossItemsUIProvider profitLossItemsUIEvents={profitLossItemsUIEvents}>
      <ProfitLossItemsLoadingDialog />
      <Route path="/accounting/profitLossItems/:id/delete">
        {({ history, match }) => (
          <ProfitLossItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/profitLossItems");
            }}
          />
        )}
      </Route>
      <ProfitLossItemsCard />
    </ProfitLossItemsUIProvider>
  );
}