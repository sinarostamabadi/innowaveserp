import React from "react";
import { Route } from "react-router-dom";
import { PaymentsLoadingDialog } from "./payments-loading-dialog/PaymentsLoadingDialog";
import { PaymentDeleteDialog } from "./payment-delete-dialog/PaymentDeleteDialog";
import { PaymentsCard } from "./PaymentsCard";
import { PaymentsUIProvider } from "./PaymentsUIContext";

export function PaymentsPage({ history }) {
  const paymentsUIEvents = {
    newPaymentButtonClick: () => {
      history.push("/cash/payments/new");
    },
    openEditPaymentPage: (id) => {
      history.push(`/cash/payments/${id}/edit`);
    },
    openDeletePaymentDialog: (id) => {
      history.push(`/cash/payments/${id}/delete`);
    },
    openDeletePaymentsDialog: () => {
      history.push(`/cash/payments/deletePayments`);
    },
    openFetchPaymentsDialog: () => {
      history.push(`/cash/payments/fetch`);
    },
    openUpdatePaymentsStatusDialog: () => {
      history.push("/cash/payments/updateStatus");
    },
  };
  
  return (
    <PaymentsUIProvider paymentsUIEvents={paymentsUIEvents}>
      <PaymentsLoadingDialog />
      <Route path="/cash/payments/:id/delete">
        {({ history, match }) => (
          <PaymentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/payments");
            }}
          />
        )}
      </Route>
      <PaymentsCard />
    </PaymentsUIProvider>
  );
}