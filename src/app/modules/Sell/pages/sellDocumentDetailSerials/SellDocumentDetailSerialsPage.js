import React from "react";
import { Route } from "react-router-dom";
import { SellDocumentDetailSerialsLoadingDialog } from "./sellDocumentDetailSerials-loading-dialog/SellDocumentDetailSerialsLoadingDialog";
import { SellDocumentDetailSerialDeleteDialog } from "./sellDocumentDetailSerial-delete-dialog/SellDocumentDetailSerialDeleteDialog";
import { SellDocumentDetailSerialsCard } from "./SellDocumentDetailSerialsCard";
import { SellDocumentDetailSerialsUIProvider } from "./SellDocumentDetailSerialsUIContext";

export function SellDocumentDetailSerialsPage({ history }) {
  const sellDocumentDetailSerialsUIEvents = {
    newSellDocumentDetailSerialButtonClick: () => {
      history.push("/sell/sellDocumentDetailSerials/new");
    },
    openEditSellDocumentDetailSerialPage: (id) => {
      history.push(`/sell/sellDocumentDetailSerials/${id}/edit`);
    },
    openDeleteSellDocumentDetailSerialDialog: (id) => {
      history.push(`/sell/sellDocumentDetailSerials/${id}/delete`);
    },
    openDeleteSellDocumentDetailSerialsDialog: () => {
      history.push(`/sell/sellDocumentDetailSerials/deleteSellDocumentDetailSerials`);
    },
    openFetchSellDocumentDetailSerialsDialog: () => {
      history.push(`/sell/sellDocumentDetailSerials/fetch`);
    },
    openUpdateSellDocumentDetailSerialsStatusDialog: () => {
      history.push("/sell/sellDocumentDetailSerials/updateStatus");
    },
  };
  
  return (
    <SellDocumentDetailSerialsUIProvider sellDocumentDetailSerialsUIEvents={sellDocumentDetailSerialsUIEvents}>
      <SellDocumentDetailSerialsLoadingDialog />
      <Route path="/sell/sellDocumentDetailSerials/:id/delete">
        {({ history, match }) => (
          <SellDocumentDetailSerialDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDocumentDetailSerials");
            }}
          />
        )}
      </Route>
      <SellDocumentDetailSerialsCard />
    </SellDocumentDetailSerialsUIProvider>
  );
}