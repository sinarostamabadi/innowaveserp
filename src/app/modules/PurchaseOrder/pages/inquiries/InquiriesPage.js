import React from "react";
import { Route } from "react-router-dom";
import { InquiriesLoadingDialog } from "./inquiries-loading-dialog/InquiriesLoadingDialog";
import { InquiryDeleteDialog } from "./inquiry-delete-dialog/InquiryDeleteDialog";
import { InquiriesCard } from "./InquiriesCard";
import { InquiriesUIProvider } from "./InquiriesUIContext";

export function InquiriesPage({ history }) {
  const inquiriesUIEvents = {
    newInquiryButtonClick: () => {
      history.push("/purchaseOrder/inquiries/new");
    },
    openEditInquiryPage: (id) => {
      history.push(`/purchaseOrder/inquiries/${id}/edit`);
    },
    openDeleteInquiryDialog: (id) => {
      history.push(`/purchaseOrder/inquiries/${id}/delete`);
    },
    openDeleteInquiriesDialog: () => {
      history.push(`/purchaseOrder/inquiries/deleteInquiries`);
    },
    openFetchInquiriesDialog: () => {
      history.push(`/purchaseOrder/inquiries/fetch`);
    },
    openUpdateInquiriesStatusDialog: () => {
      history.push("/purchaseOrder/inquiries/updateStatus");
    },
  };

  return (
    <InquiriesUIProvider inquiriesUIEvents={inquiriesUIEvents}>
      <InquiriesLoadingDialog />
      <Route path="/purchaseOrder/inquiries/:id/delete">
        {({ history, match }) => (
          <InquiryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/inquiries");
            }}
          />
        )}
      </Route>
      <InquiriesCard />
    </InquiriesUIProvider>
  );
}
