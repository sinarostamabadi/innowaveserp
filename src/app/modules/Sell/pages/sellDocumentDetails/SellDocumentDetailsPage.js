import React from "react";
import { Route } from "react-router-dom";
import { SellDocumentDetailsLoadingDialog } from "./sellDocumentDetails-loading-dialog/SellDocumentDetailsLoadingDialog";
import { SellDocumentDetailDeleteDialog } from "./sellDocumentDetail-delete-dialog/SellDocumentDetailDeleteDialog";
import { SellDocumentDetailsCard } from "./SellDocumentDetailsCard";
import { SellDocumentDetailsUIProvider } from "./SellDocumentDetailsUIContext";

export function SellDocumentDetailsPage({ history }) {
  const sellDocumentDetailsUIEvents = {
    newSellDocumentDetailButtonClick: () => {
      history.push("/sell/sellDocumentDetails/new");
    },
    openEditSellDocumentDetailPage: (id) => {
      history.push(`/sell/sellDocumentDetails/${id}/edit`);
    },
    openDeleteSellDocumentDetailDialog: (id) => {
      history.push(`/sell/sellDocumentDetails/${id}/delete`);
    },
    openDeleteSellDocumentDetailsDialog: () => {
      history.push(`/sell/sellDocumentDetails/deleteSellDocumentDetails`);
    },
    openFetchSellDocumentDetailsDialog: () => {
      history.push(`/sell/sellDocumentDetails/fetch`);
    },
    openUpdateSellDocumentDetailsStatusDialog: () => {
      history.push("/sell/sellDocumentDetails/updateStatus");
    },
  };
  
  return (
    <SellDocumentDetailsUIProvider sellDocumentDetailsUIEvents={sellDocumentDetailsUIEvents}>
      <SellDocumentDetailsLoadingDialog />
      <Route path="/sell/sellDocumentDetails/:id/delete">
        {({ history, match }) => (
          <SellDocumentDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDocumentDetails");
            }}
          />
        )}
      </Route>
      <SellDocumentDetailsCard />
    </SellDocumentDetailsUIProvider>
  );
}