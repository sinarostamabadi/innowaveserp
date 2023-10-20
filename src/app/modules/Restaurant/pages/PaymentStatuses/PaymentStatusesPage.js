import React from "react";
import { Route } from "react-router-dom";
import { PaymentStatusesLoadingDialog } from "./paymentStatuses-loading-dialog/PaymentStatusesLoadingDialog";
import { PaymentStatusDeleteDialog } from "./paymentStatus-delete-dialog/PaymentStatusDeleteDialog";
import { PaymentStatusesCard } from "./PaymentStatusesCard";
import { PaymentStatusesUIProvider } from "./PaymentStatusesUIContext";

export function PaymentStatusesPage({ history }) {
  const paymentStatusesUIEvents = {
    newPaymentStatusButtonClick: () => {
      history.push("//paymentStatuses/new");
    },
    openEditPaymentStatusPage: (id) => {
      history.push(`//paymentStatuses/${id}/edit`);
    },
    openDeletePaymentStatusDialog: (id) => {
      history.push(`//paymentStatuses/${id}/delete`);
    },
    openDeletePaymentStatusesDialog: () => {
      history.push(`//paymentStatuses/deletePaymentStatuses`);
    },
    openFetchPaymentStatusesDialog: () => {
      history.push(`//paymentStatuses/fetch`);
    },
    openUpdatePaymentStatusesStatusDialog: () => {
      history.push("//paymentStatuses/updateStatus");
    },
  };
  
  return (
    <PaymentStatusesUIProvider paymentStatusesUIEvents={paymentStatusesUIEvents}>
      <PaymentStatusesLoadingDialog />
      <Route path="//paymentStatuses/:id/delete">
        {({ history, match }) => (
          <PaymentStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("//paymentStatuses");
            }}
          />
        )}
      </Route>
      <PaymentStatusesCard />
    </PaymentStatusesUIProvider>
  );
}