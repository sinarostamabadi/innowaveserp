import React from "react";
import { Route } from "react-router-dom";
import { ReceiptSerialsLoadingDialog } from "./receiptSerials-loading-dialog/ReceiptSerialsLoadingDialog";
import { ReceiptSerialDeleteDialog } from "./receiptSerial-delete-dialog/ReceiptSerialDeleteDialog";
import { ReceiptSerialsCard } from "./ReceiptSerialsCard";
import { ReceiptSerialsUIProvider } from "./ReceiptSerialsUIContext";

export function ReceiptSerialsPage({ history }) {
  const receiptSerialsUIEvents = {
    newReceiptSerialButtonClick: () => {
      history.push("/warehouse/receiptSerials/new");
    },
    openEditReceiptSerialPage: (id) => {
      history.push(`/warehouse/receiptSerials/${id}/edit`);
    },
    openDeleteReceiptSerialDialog: (id) => {
      history.push(`/warehouse/receiptSerials/${id}/delete`);
    },
    openDeleteReceiptSerialsDialog: () => {
      history.push(`/warehouse/receiptSerials/deleteReceiptSerials`);
    },
    openFetchReceiptSerialsDialog: () => {
      history.push(`/warehouse/receiptSerials/fetch`);
    },
    openUpdateReceiptSerialsStatusDialog: () => {
      history.push("/warehouse/receiptSerials/updateStatus");
    },
  };
  
  return (
    <ReceiptSerialsUIProvider receiptSerialsUIEvents={receiptSerialsUIEvents}>
      <ReceiptSerialsLoadingDialog />
      <Route path="/warehouse/receiptSerials/:id/delete">
        {({ history, match }) => (
          <ReceiptSerialDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/receiptSerials");
            }}
          />
        )}
      </Route>
      <ReceiptSerialsCard />
    </ReceiptSerialsUIProvider>
  );
}