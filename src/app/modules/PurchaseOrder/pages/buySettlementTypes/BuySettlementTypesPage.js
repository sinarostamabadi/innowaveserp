import React from "react";
import { Route } from "react-router-dom";
import { BuySettlementTypesLoadingDialog } from "./buySettlementTypes-loading-dialog/BuySettlementTypesLoadingDialog";
import { BuySettlementTypeDeleteDialog } from "./buySettlementType-delete-dialog/BuySettlementTypeDeleteDialog";
import { BuySettlementTypesCard } from "./BuySettlementTypesCard";
import { BuySettlementTypesUIProvider } from "./BuySettlementTypesUIContext";

export function BuySettlementTypesPage({ history }) {
  const buySettlementTypesUIEvents = {
    newBuySettlementTypeButtonClick: () => {
      history.push("/purchaseOrder/buySettlementTypes/new");
    },
    openEditBuySettlementTypePage: (id) => {
      history.push(`/purchaseOrder/buySettlementTypes/${id}/edit`);
    },
    openDeleteBuySettlementTypeDialog: (id) => {
      history.push(`/purchaseOrder/buySettlementTypes/${id}/delete`);
    },
    openDeleteBuySettlementTypesDialog: () => {
      history.push(
        `/purchaseOrder/buySettlementTypes/deleteBuySettlementTypes`
      );
    },
    openFetchBuySettlementTypesDialog: () => {
      history.push(`/purchaseOrder/buySettlementTypes/fetch`);
    },
    openUpdateBuySettlementTypesStatusDialog: () => {
      history.push("/purchaseOrder/buySettlementTypes/updateStatus");
    },
  };

  return (
    <BuySettlementTypesUIProvider
      buySettlementTypesUIEvents={buySettlementTypesUIEvents}
    >
      <BuySettlementTypesLoadingDialog />
      <Route path="/purchaseOrder/buySettlementTypes/:id/delete">
        {({ history, match }) => (
          <BuySettlementTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buySettlementTypes");
            }}
          />
        )}
      </Route>
      <BuySettlementTypesCard />
    </BuySettlementTypesUIProvider>
  );
}
