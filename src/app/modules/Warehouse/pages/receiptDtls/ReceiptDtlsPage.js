import React from "react";
import { Route } from "react-router-dom";
import { ReceiptDtlsLoadingDialog } from "./receiptDtls-loading-dialog/ReceiptDtlsLoadingDialog";
import { ReceiptDtlDeleteDialog } from "./receiptDtl-delete-dialog/ReceiptDtlDeleteDialog";
import { ReceiptDtlsCard } from "./ReceiptDtlsCard";
import { ReceiptDtlsUIProvider } from "./ReceiptDtlsUIContext";

export function ReceiptDtlsPage({ history }) {
  const receiptDtlsUIEvents = {
    newReceiptDtlButtonClick: () => {
      history.push("/warehouse/receiptDtls/new");
    },
    openEditReceiptDtlPage: (id) => {
      history.push(`/warehouse/receiptDtls/${id}/edit`);
    },
    openDeleteReceiptDtlDialog: (id) => {
      history.push(`/warehouse/receiptDtls/${id}/delete`);
    },
    openDeleteReceiptDtlsDialog: () => {
      history.push(`/warehouse/receiptDtls/deleteReceiptDtls`);
    },
    openFetchReceiptDtlsDialog: () => {
      history.push(`/warehouse/receiptDtls/fetch`);
    },
    openUpdateReceiptDtlsStatusDialog: () => {
      history.push("/warehouse/receiptDtls/updateStatus");
    },
  };
  
  return (
    <ReceiptDtlsUIProvider receiptDtlsUIEvents={receiptDtlsUIEvents}>
      <ReceiptDtlsLoadingDialog />
      <Route path="/warehouse/receiptDtls/:id/delete">
        {({ history, match }) => (
          <ReceiptDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/receiptDtls");
            }}
          />
        )}
      </Route>
      <ReceiptDtlsCard />
    </ReceiptDtlsUIProvider>
  );
}