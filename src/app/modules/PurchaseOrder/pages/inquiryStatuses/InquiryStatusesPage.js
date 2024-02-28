import React from "react";
import { Route } from "react-router-dom";
import { InquiryStatusesLoadingDialog } from "./inquiryStatuses-loading-dialog/InquiryStatusesLoadingDialog";
import { InquiryStatusDeleteDialog } from "./inquiryStatus-delete-dialog/InquiryStatusDeleteDialog";
import { InquiryStatusesCard } from "./InquiryStatusesCard";
import { InquiryStatusesUIProvider } from "./InquiryStatusesUIContext";

export function InquiryStatusesPage({ history }) {
  const inquiryStatusesUIEvents = {
    newInquiryStatusButtonClick: () => {
      history.push("/purchaseOrder/inquiryStatuses/new");
    },
    openEditInquiryStatusPage: (id) => {
      history.push(`/purchaseOrder/inquiryStatuses/${id}/edit`);
    },
    openDeleteInquiryStatusDialog: (id) => {
      history.push(`/purchaseOrder/inquiryStatuses/${id}/delete`);
    },
    openDeleteInquiryStatusesDialog: () => {
      history.push(`/purchaseOrder/inquiryStatuses/deleteInquiryStatuses`);
    },
    openFetchInquiryStatusesDialog: () => {
      history.push(`/purchaseOrder/inquiryStatuses/fetch`);
    },
    openUpdateInquiryStatusesStatusDialog: () => {
      history.push("/purchaseOrder/inquiryStatuses/updateStatus");
    },
  };

  return (
    <InquiryStatusesUIProvider
      inquiryStatusesUIEvents={inquiryStatusesUIEvents}
    >
      <InquiryStatusesLoadingDialog />
      <Route path="/purchaseOrder/inquiryStatuses/:id/delete">
        {({ history, match }) => (
          <InquiryStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/inquiryStatuses");
            }}
          />
        )}
      </Route>
      <InquiryStatusesCard />
    </InquiryStatusesUIProvider>
  );
}
