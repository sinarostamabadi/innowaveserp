import React from "react";
import { Route } from "react-router-dom";
import { ReceiptsLoadingDialog } from "./receipts-loading-dialog/ReceiptsLoadingDialog";
import { ReceiptDeleteDialog } from "./receipt-delete-dialog/ReceiptDeleteDialog";
import { ReceiptsCard } from "./ReceiptsCard";
import { ReceiptsUIProvider } from "./ReceiptsUIContext";

export function ReceiptsPage({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const receiptsUIEvents = {
    newReceiptButtonClick: () => {
      history.push(
        !!mode ? `/warehouse/receipts/new/${mode}` : "/warehouse/receipts/new"
      );
    },
    openEditReceiptPage: (id) => {
      history.push(`/warehouse/receipts/${id}/edit`);
    },
    openDeleteReceiptDialog: (id) => {
      history.push(`/warehouse/receipts/${id}/delete`);
    },
    openDeleteReceiptsDialog: () => {
      history.push(`/warehouse/receipts/deleteReceipts`);
    },
    openFetchReceiptsDialog: () => {
      history.push(`/warehouse/receipts/fetch`);
    },
    openUpdateReceiptsStatusDialog: () => {
      history.push("/warehouse/receipts/updateStatus");
    },
  };

  return (
    <ReceiptsUIProvider receiptsUIEvents={receiptsUIEvents} mode={mode}>
      <ReceiptsLoadingDialog />
      <Route path="/warehouse/receipts/:id/delete">
        {({ history, match }) => (
          <ReceiptDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(
                !!mode ? `/warehouse/receipts/${mode}` : "/warehouse/receipts"
              );
            }}
          />
        )}
      </Route>
      <ReceiptsCard />
    </ReceiptsUIProvider>
  );
}
